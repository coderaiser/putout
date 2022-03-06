function fixCatch(text) {
     return text
        .replaceAll('catch{', 'catch {')
        .replaceAll('}catch', '} catch')
        .replaceAll('catch (', 'catch(');
}
