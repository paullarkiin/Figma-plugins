

figma.showUI(__html__);

figma.ui.onmessage = async (pluginMessage) => {

    await figma.loadFontAsync({family: "Inter", style:"Regular"})

    console.log(pluginMessage)

    const nodes:SceneNode[] = [];

    let selectedText;
    selectedText =  figma.root.findOne(node => node.type == "TEXT") as TextNode;
    console.log(selectedText)
    selectedText.characters = pluginMessage.name
   
    nodes.push(selectedText)

}