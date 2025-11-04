export type PhotoInfoResponse = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
    blobUrl: string;
};

/**
 * Fetch photo info from the API
 * @param id - The ID of the photo
 * @returns The photo info
 */
export async function fetchPhotoInfo(id: number = 0): Promise<PhotoInfoResponse> {
    const response = await fetch(`https://picsum.photos/id/${id}/info`);

    if (!response.ok) {
        throw new Error('Failed to fetch photo info');
    }

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
        throw new Error('Invalid response format');
    }

    const data = (await response.json()) as PhotoInfoResponse;

    const download_url =
        data.download_url || `https://picsum.photos/id/${data.id}/${data.width}/${data.height}`;

    const imageResp = await fetch(download_url);
    const blob = await imageResp.blob();
    const blobUrl = URL.createObjectURL(blob);

    return {
        id: data.id,
        author: data.author,
        width: data.width,
        height: data.height,
        url: data.url,
        download_url,
        blobUrl,
    };
}
