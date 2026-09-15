export async function show(data, options = {}) {
    if (type === 'markdown')
        return await CloudCmd.Markdown.show(Info.path);
    
    if (type === 'html')
        return viewHtml(path);
    
    if (type === 'image')
        return viewImage(Info.path, prefixURL);
    
    if (type === 'media')
        return await viewMedia(path);
    
    if (type === 'pdf')
        return viewPDF(path);
    
    return await viewFile();
}
