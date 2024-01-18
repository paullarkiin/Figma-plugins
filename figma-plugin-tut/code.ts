figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = async (pluginMessage) => {

    await figma.loadFontAsync({family: "Rubik", style:"Regular"})

    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
    
    const nodes:SceneNode[] = [];

    let selectedVarient;
    
    if(pluginMessage.darkModeState === true){
        switch(pluginMessage.imageVariant) {
            case "2":
                selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
                break;
            case "3":
                selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
                break;
            default:
                selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
                break;
        }
    }else{
        switch(pluginMessage.imageVariant) {
            case "2":
                selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
                break;
            case "3":
                selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
                break;
            default:
                selectedVarient = postComponentSet.defaultVariant as ComponentNode;
                break;
        }
    }

    const newPost = selectedVarient.createInstance();

    const templateName = newPost.findOne(node => node.type == "TEXT" && node.name == "displayName") as TextNode;
    const templateUserName = newPost.findOne(node => node.type == "TEXT" && node.name == "@username") as TextNode;
    const templateDescription = newPost.findOne(node => node.type == "TEXT" && node.name == "description") as TextNode;

    const numLikes = newPost.findOne(node => node.type == "TEXT" && node.name == "likesLabel") as TextNode;
    const numComments = newPost.findOne(node => node.type == "TEXT" && node.name == "commentsLabel") as TextNode;

    //characters prop allows you to replace text submitted from the formm
    templateName.characters = pluginMessage.name;
    templateUserName.characters = pluginMessage.username;
    templateDescription.characters = pluginMessage.description;
    numLikes.characters = (Math.random() *1000 + 1).toString();
    numComments.characters = (Math.random() *1000 + 1).toString();

    nodes.push(newPost);
    figma.viewport.scrollAndZoomIntoView(nodes);
    
    figma.closePlugin();
}
