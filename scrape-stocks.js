import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';
import axios from 'axios';

const URL = 'https://finance.yahoo.com/markets/stocks/gainers/';

// Japanese translation mapping for headers
const headerTranslations = {
  'Symbol': 'シンボル',
  'Name': '会社名',
  'Price': '価格',
  'Change': '変動額',
  'Change %': '変動率',
  'Volume': '出来高',
  'Avg Vol (3M)': '平均出来高（3ヶ月）',
  'Market Cap': '時価総額',
  'P/E Ratio (TTM)': 'P/E比率（TTM）',
  '52 Wk Change %': '52週間変動率',
  '52 Wk Range': '52週間レンジ',
  'Company': '会社名'
};

// Function to get USD/JPY exchange rate
async function getUSDJPYRate() {
  try {
    // Try to get from Yahoo Finance
    const response = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/USDJPY=X', {
      params: {
        interval: '1d',
        range: '1d'
      }
    });
    
    if (response.data && response.data.chart && response.data.chart.result) {
      const result = response.data.chart.result[0];
      if (result.meta && result.meta.regularMarketPrice) {
        return result.meta.regularMarketPrice;
      }
    }
    
    // Fallback: use approximate rate (around 150 JPY per USD)
    console.log('Warning: Could not fetch exchange rate, using approximate rate of 150 JPY/USD');
    return 150;
  } catch (error) {
    console.log('Warning: Could not fetch exchange rate, using approximate rate of 150 JPY/USD');
    return 150; // Fallback rate
  }
}

// Function to extract numeric price from price string
function extractPrice(priceString) {
  if (!priceString) return null;
  
  // Extract the first number (before any + or - signs)
  const match = priceString.match(/^([\d,]+\.?\d*)/);
  if (match) {
    return parseFloat(match[1].replace(/,/g, ''));
  }
  return null;
}

async function scrapeStockData() {
  let browser;
  try {
    console.log('Launching browser...');
    
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Navigating to Yahoo Finance...');
    await page.goto(URL, { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });

    // Wait a bit for page to fully load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract table data
    console.log('Extracting table data...');
    const tableData = await page.evaluate(() => {
      // Find the section with class containing "mainyf-gwaldu"
      let section = document.querySelector('section.mainyf-gwaldu');
      if (!section) {
        // Try with attribute selector
        const sections = document.querySelectorAll('section');
        for (const s of sections) {
          if (s.className && s.className.includes('mainyf-gwaldu')) {
            section = s;
            break;
          }
        }
      }
      if (!section) {
        // Try broader search
        const sections = document.querySelectorAll('section');
        for (const s of sections) {
          if (s.className && s.className.includes('mainyf')) {
            section = s;
            break;
          }
        }
      }

      // If still no section, try to find table directly
      let table = null;
      if (section) {
        table = section.querySelector('table');
      }

      // If no section found, try to find table directly
      if (!table) {
        // Try finding any table that might contain stock data
        const allTables = document.querySelectorAll('table');
        for (const t of allTables) {
          const text = t.textContent.toLowerCase();
          if (text.includes('symbol') || text.includes('price') || text.includes('change') || 
              text.includes('gainers') || text.includes('stock')) {
            table = t;
            break;
          }
        }
      }

      // Last resort: find the largest table (likely the main data table)
      if (!table) {
        const allTables = Array.from(document.querySelectorAll('table'));
        if (allTables.length > 0) {
          // Find table with most rows
          table = allTables.reduce((max, t) => {
            const rows = t.querySelectorAll('tr').length;
            const maxRows = max ? max.querySelectorAll('tr').length : 0;
            return rows > maxRows ? t : max;
          });
        }
      }

      if (!table) {
        // Debug: log available sections and tables
        const sections = Array.from(document.querySelectorAll('section')).map(s => ({
          className: s.className,
          id: s.id
        }));
        const tables = Array.from(document.querySelectorAll('table')).map(t => ({
          rows: t.querySelectorAll('tr').length,
          text: t.textContent.substring(0, 100)
        }));
        console.log('Available sections:', sections);
        console.log('Available tables:', tables);
        throw new Error('Could not find table');
      }

      // Extract headers
      const headers = [];
      const headerRow = table.querySelector('thead tr') || table.querySelector('tr');
      
      if (headerRow) {
        headerRow.querySelectorAll('th, td').forEach((cell) => {
          const text = cell.textContent.trim();
          // Filter out random class names and empty cells
          if (text && 
              !text.toLowerCase().includes('yf-gwaldu') && 
              !cell.classList.contains('yf-gwaldu') &&
              text.length > 0 &&
              !text.match(/^[a-z]+-[a-z]+$/)) {
            headers.push(text);
          }
        });
      }

      // If no headers found, use default headers
      if (headers.length === 0) {
        headers.push('Symbol', 'Company', 'Price', 'Change', 'Change %', 'Volume', 'Market Cap', '52 Week High', '52 Week Range');
      }

      // Extract rows
      const rows = [];
      const tbody = table.querySelector('tbody') || table;
      const dataRows = tbody.querySelectorAll('tr');

      dataRows.forEach((row, rowIndex) => {
        // Skip header row
        if (rowIndex === 0 && row.querySelector('th')) {
          return;
        }

        const rowData = {};
        let colIndex = 0;
        
        row.querySelectorAll('td, th').forEach((cell) => {
          const text = cell.textContent.trim();
          
          // Filter out cells with random class names
          if (text && 
              !text.toLowerCase().includes('yf-gwaldu') && 
              !cell.classList.contains('yf-gwaldu') &&
              text.length > 0 &&
              !text.match(/^[a-z]+-[a-z]+$/)) {
            const header = headers[colIndex] || `Column ${colIndex + 1}`;
            rowData[header] = text;
            colIndex++;
          }
        });

        // Only add row if it has meaningful data (at least 2 columns)
        if (Object.keys(rowData).length >= 2) {
          rows.push(rowData);
        }
      });

      return { headers, rows };
    });

    console.log(`Found ${tableData.rows.length} rows of data`);
    console.log('Headers:', tableData.headers);

    if (tableData.rows.length === 0) {
      throw new Error('No data rows found');
    }

    // Get USD/JPY exchange rate
    console.log('Fetching USD/JPY exchange rate...');
    const usdJpyRate = await getUSDJPYRate();
    console.log(`USD/JPY rate: ${usdJpyRate}`);

    // Get current date
    const currentDate = new Date();
    const dateStringEN = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
    const dateStringJP = currentDate.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });

    // ============================================
    // Create English version (original)
    // ============================================
    console.log('\n📄 Creating English version (original)...');
    const englishData = [];
    
    // Add date row as first row
    const englishDateRow = new Array(tableData.headers.length).fill('');
    englishDateRow[0] = `Date: ${dateStringEN}`;
    englishData.push(englishDateRow);
    
    // Add English headers
    englishData.push(tableData.headers);
    
    // Add English data rows
    tableData.rows.forEach(row => {
      const dataRow = tableData.headers.map(header => {
        return row[header] || '';
      });
      englishData.push(dataRow);
    });

    // Create English Excel workbook
    const englishWorksheet = XLSX.utils.aoa_to_sheet(englishData);
    const englishWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(englishWorkbook, englishWorksheet, 'Stock Gainers');
    
    // Set column widths
    const englishColWidths = tableData.headers.map(() => ({ wch: 20 }));
    englishWorksheet['!cols'] = englishColWidths;

    // Write English file
    const englishFilename = 'stock_gainers_english.xlsx';
    XLSX.writeFile(englishWorkbook, englishFilename);
    console.log(`✅ English version saved to ${englishFilename}`);

    // ============================================
    // Create Japanese version with JPY prices
    // ============================================
    console.log('\n📄 Creating Japanese version with JPY conversion...');
    
    // Translate headers to Japanese
    const japaneseHeaders = tableData.headers.map(header => {
      return headerTranslations[header] || header;
    });

    // Process rows: translate headers
    const processedRows = tableData.rows.map(row => {
      const processedRow = {};
      for (const [key, value] of Object.entries(row)) {
        const japaneseKey = headerTranslations[key] || key;
        processedRow[japaneseKey] = value;
      }
      return processedRow;
    });

    // Create Japanese Excel data with JPY prices in a new row below each price
    const japaneseData = [];
    
    // Add date row as first row
    const japaneseDateRow = new Array(japaneseHeaders.length).fill('');
    japaneseDateRow[0] = `日付: ${dateStringJP}`;
    japaneseData.push(japaneseDateRow);
    
    // Add header row
    japaneseData.push(japaneseHeaders);
    
    // Find the Price column index
    const priceColumnIndex = japaneseHeaders.indexOf('価格');
    
    // Add data rows with JPY prices in separate rows
    processedRows.forEach(row => {
      // Add the main data row
      const dataRow = japaneseHeaders.map(header => {
        return row[header] || '';
      });
      japaneseData.push(dataRow);
      
      // Add JPY price row below (only in Price column)
      if (priceColumnIndex >= 0) {
        const priceValue = row['価格'] || '';
        const priceNum = extractPrice(priceValue);
        
        if (priceNum !== null) {
          const jpyPrice = Math.round(priceNum * usdJpyRate);
          const jpyRow = new Array(japaneseHeaders.length).fill('');
          jpyRow[priceColumnIndex] = `${jpyPrice.toLocaleString('ja-JP')}円`;
          japaneseData.push(jpyRow);
        } else {
          // Add empty row to maintain structure
          japaneseData.push(new Array(japaneseHeaders.length).fill(''));
        }
      }
    });

    // Create Japanese Excel workbook
    const japaneseWorksheet = XLSX.utils.aoa_to_sheet(japaneseData);
    const japaneseWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(japaneseWorkbook, japaneseWorksheet, 'Stock Gainers');

    // Set column widths
    const japaneseColWidths = japaneseHeaders.map(() => ({ wch: 20 }));
    japaneseWorksheet['!cols'] = japaneseColWidths;

    // Write Japanese file
    const japaneseFilename = 'stock_gainers_japanese.xlsx';
    XLSX.writeFile(japaneseWorkbook, japaneseFilename);
    console.log(`✅ Japanese version saved to ${japaneseFilename}`);
    
    console.log(`\n📊 Summary:`);
    console.log(`   - English version: ${englishFilename} (${tableData.rows.length} stocks)`);
    console.log(`   - Japanese version: ${japaneseFilename} (${processedRows.length} stocks with JPY prices)`);
    console.log(`   - Exchange rate used: 1 USD = ${usdJpyRate} JPY`);

  } catch (error) {
    console.error('Error scraping data:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the scraper
scrapeStockData();
