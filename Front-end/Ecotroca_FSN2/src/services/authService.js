export const login = (email, senha) => {
  //LOGIN: test@test.com / 123456
  if (email === 'test@test.com' && senha === '123456') {
    return Promise.resolve({ token: 'mock-jwt', refreshToken: 'mock-refresh', user: {id:1, nome:'Test User', email, cidade:'SP'} });
  }
  return Promise.reject(new Error('Credenciais inválidas'));
};

export const register = (userData) => Promise.resolve({ success: true, user: userData });

export const getCurrentUser = () => Promise.resolve({ id:1, nome:'Test User', email:'test@test.com', cidade:'SP', imagem_perfil:'user.png' });

export const updateProfile = () => Promise.resolve({ success: true });

export const logout = () => Promise.resolve({ success: true });
