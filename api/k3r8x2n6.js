export default async function handler(req, res) {
    const projectId = process.env.X7K2M9;

    // Prevent all caching so polling always gets fresh data
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Surrogate-Control', 'no-store');

    // Fail-open: if env var is missing, site works normally
    if (!projectId) {
        return res.status(200).json({ active: true });
    }

    try {
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/site_status/config`;
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(200).json({ active: true });
        }

        const data = await response.json();
        const isActive = data?.fields?.is_active?.booleanValue;
        return res.status(200).json({ active: isActive !== false });
    } catch (error) {
        return res.status(200).json({ active: true });
    }
}
