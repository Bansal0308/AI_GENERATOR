//eslint-disable-next-line import/prefer-defsult-export

export const createError = (status,message) => {
    const err=new Error();
    err.status=status;
    err.message=message;
    return err;
};
