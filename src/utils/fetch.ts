/* eslint-disable @typescript-eslint/no-explicit-any */
// Utilities Function for Fetching Data

export type ResponseType = {
    meta: {
        success: boolean,
        message: string,
        status: number
    },
    data: any
}

export async function fd(url: string, options: RequestInit = {}, isUploadFile: boolean = false): Promise<ResponseType> {
    let defaultHeaders: HeadersInit = {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
    };

    // Hapus Content-Type untuk FormData
    if (!isUploadFile) {
        defaultHeaders = {
            ...defaultHeaders,
            'Content-Type': 'application/json',
        };
    }
    const config: RequestInit = {
        method: options.method || 'GET',
        headers: { ...defaultHeaders, ...options.headers },
    };

    if (isUploadFile && options.body instanceof FormData) {
        config.body = options.body;
        // Hapus Content-Type karena FormData mengatur header ini otomatis
    } else if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, config);
        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Fetch error:', error.message);
        throw error; // Re-throw the error to be handled by the caller
    }
}
