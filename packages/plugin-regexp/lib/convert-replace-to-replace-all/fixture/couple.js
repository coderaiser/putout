function fixCatch(text) {
     return text
        .replace(/catch{/g, 'catch {')
        .replace(/}catch/g, '} catch')
        .replace(/catch \(/g, 'catch(');
}
