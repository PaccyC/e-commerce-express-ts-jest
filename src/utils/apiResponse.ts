

export const apiResponse = ()=>{
    return {
        success: (data: any) => ({
            status: 200,
            data
        }),
        error: (error: any) => ({
            status: error.status || 500,
            message: error.message,
            error: error.stack
        })
    }
}