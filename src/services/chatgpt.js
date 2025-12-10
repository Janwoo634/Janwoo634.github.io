/**
 * ChatGPT API 서비스
 * gpt-4o-mini 모델을 사용하여 OpenAI API를 호출합니다.
 */

const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * ChatGPT API를 호출하여 응답을 받습니다.
 * @param {string} message - 사용자 메시지
 * @param {Array} conversationHistory - 대화 이력 (선택사항)
 * @param {Object} options - 추가 옵션 (temperature, max_tokens 등)
 * @returns {Promise<Object>} API 응답 객체
 */
export async function callChatGPT(message, conversationHistory = [], options = {}) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다. .env 파일에 VITE_OPENAI_API_KEY를 확인하세요.');
  }

  // 기본 시스템 메시지 추가
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    ...conversationHistory,
    {
      role: 'user',
      content: message
    }
  ];

  const requestBody = {
    model: 'gpt-4o-mini',
    messages: messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 1000,
    ...options
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: data.choices[0]?.message?.content || '',
      usage: data.usage,
      model: data.model
    };
  } catch (error) {
    console.error('ChatGPT API 오류:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 스트리밍 응답을 받습니다 (실시간 응답)
 * @param {string} message - 사용자 메시지
 * @param {Function} onChunk - 청크를 받을 때마다 호출되는 콜백 함수
 * @param {Array} conversationHistory - 대화 이력
 * @returns {Promise<void>}
 */
export async function streamChatGPT(message, onChunk, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다.');
  }

  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    ...conversationHistory,
    {
      role: 'user',
      content: message
    }
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            return;
          }
          try {
            const json = JSON.parse(data);
            const content = json.choices[0]?.delta?.content || '';
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            // JSON 파싱 오류 무시
          }
        }
      }
    }
  } catch (error) {
    console.error('스트리밍 오류:', error);
    throw error;
  }
}

