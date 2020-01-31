export function parse(xmlStr) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlStr, "text/xml");
    const channel = xml.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0];
    const baseUrl = channel.getElementsByTagName('title')[0].innerHTML;
    const items = channel.getElementsByTagName('item');
    
    const stories = [];
    for (let item of items) {
        stories.push({
            key: item.getElementsByTagName('key')[0].innerHTML,
            title: item.getElementsByTagName('summary')[0].innerHTML,
            description: decodeHtml(item.getElementsByTagName('description')[0].innerHTML, baseUrl),
            created: item.getElementsByTagName('created')[0].innerHTML,
            assignee: item.getElementsByTagName('assignee')[0].innerHTML,
            iconUrl: item.getElementsByTagName('type')[0].getAttribute('iconUrl'),
            storyPoints: getStoryPoints(item),
        });
    }
    return stories;
}

function decodeHtml(html, baseUrl) {
    html = html.replace('/secure/attachment', `//${baseUrl}/secure/attachment`);
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function getCustomElements(item) {
    return item.getElementsByTagName('customfields')[0]
        .getElementsByTagName('customfield');
}

function getStoryPoints(item) {
    const els = getCustomElements(item);
    console.log(`got ${els.length} els`);
    for (let el of els) {
        console.log(el.getAttribute('key'));
        if (el.getAttribute('key').indexOf('jsw-story-points') > -1) {
            return el.getElementsByTagName('customfieldvalues')[0]
                .getElementsByTagName('customfieldvalue')[0]
                .innerHTML
        }
    }
}