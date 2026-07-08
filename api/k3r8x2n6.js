

export default async function handler(req, res) {
    const dbUrl = process.env.X7K2M9;
    const apiKey = process.env.Q4R8W1;


    if (!dbUrl || !apiKey) {
        return res.status(200).json({ active: true });
    }

    try {
        const response = await fetch(
            `${dbUrl}/site_status/is_active.json?auth=${apiKey}`
        );

        if (!response.ok) {
            
            return res.status(200).json({ active: true });
        }

        const isActive = await response.json();
        return res.status(200).json({ active: isActive !== false });
    } catch (error) {
        
        return res.status(200).json({ active: true });
    }
}
