export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/perfil',
  ITEMS: '/itens',
  ITEM_DETAIL: '/itens/:id',
  NEW_ITEM: '/itens/novo',
  EDIT_ITEM: '/itens/editar/:id',
  MY_ITEMS: '/meus-itens',
  PROPOSALS: '/propostas',
  PROPOSAL_DETAIL: '/propostas/:id',
  NOT_FOUND: '/404',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Por favor, verifique os dados informados.',
  DEFAULT: 'Ocorreu um erro inesperado. Tente novamente.',
};

export const SUCCESS_MESSAGES = {
  ITEM_CREATED: 'Item cadastrado com sucesso!',
  ITEM_UPDATED: 'Item atualizado com sucesso!',
  ITEM_DELETED: 'Item removido com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!',
  PROPOSAL_SENT: 'Proposta enviada com sucesso!',
  PROPOSAL_UPDATED: 'Proposta atualizada com sucesso!',
  PROPOSAL_DELETED: 'Proposta cancelada com sucesso!',
};

export const VALIDATION_RULES = {
  EMAIL: {
    required: 'E-mail é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'E-mail inválido',
    },
  },
  PASSWORD: {
    required: 'Senha é obrigatória',
    minLength: {
      value: 6,
      message: 'A senha deve ter no mínimo 6 caracteres',
    },
  },
  REQUIRED: (field) => ({
    required: `${field} é obrigatório`,
  }),
  MIN_LENGTH: (field, length) => ({
    minLength: {
      value: length,
      message: `${field} deve ter no mínimo ${length} caracteres`,
    },
  }),
  MAX_LENGTH: (field, length) => ({
    maxLength: {
      value: length,
      message: `${field} deve ter no máximo ${length} caracteres`,
    },
  }),
};
