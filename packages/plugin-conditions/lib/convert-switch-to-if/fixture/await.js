export async function show(data, options = {}) {
    switch(type) {
    default:
        return await viewFile();
    
    case 'markdown':
        return await CloudCmd.Markdown.show(Info.path);
    
    case 'html':
        return viewHtml(path);
    
    case 'image':
        return viewImage(Info.path, prefixURL);
    
    case 'media':
        return await viewMedia(path);
    
    case 'pdf':
        return viewPDF(path);
    }
}
