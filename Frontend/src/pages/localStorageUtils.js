
export const getUserIdFromLocalStorage = () => {
    const userId = localStorage.getItem('userId');
    return userId ? userId : null;
  };
  