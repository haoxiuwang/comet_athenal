let files = await unpackPackFile(arrayBuffer);
    files = files.map(f => {  
        return new File([f.data], f.name, {
            type: f.type || "application/octet-stream",
            lastModified: Date.now(),
        });
    });