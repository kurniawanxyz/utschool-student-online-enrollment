/* eslint-disable @typescript-eslint/no-explicit-any */
// Utilities Function for Fetching Data

export type ResponseType = {
    head: {
        success: boolean,
        message: string,
        status: number
    },
    data: any
}

export async function fd(url: string, options: RequestInit = {}, isUploadFile: boolean = false): Promise<ResponseType> {
    let defaultHeaders
    if (!isUploadFile) {
        defaultHeaders = {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        };
    } else {
        defaultHeaders = {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
        }
    }

    const config: RequestInit = {
        method: options.method || 'GET',
        headers: { ...defaultHeaders, ...options.headers },
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong!');
        }

        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Fetch error:', error.message);
        throw error; // Re-throw the error to be handled by the caller
    }
}
