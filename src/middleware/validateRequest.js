

export const ValidateRequest = (schema) =>{
    return (req,res,next) =>{
        const result = schema.safeParse(req.body);

        if(!result.success){
            // const errorMsg =result.error.erros.map((err)=> err.message)
            // const fullError = errorMsg.join(", ")
            // return res.status(400).json({message:fullError});
            const formatted = result.error.format();

            const flatErrors = Object.values(formatted)
              .flat()
              .filter(Boolean)
              .map((err) => err._errors)
              .flat();
      
            return res.status(400).json({ message: flatErrors.join(", ") });
        }
        next();
    }
}