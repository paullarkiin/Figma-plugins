
figma.showUI(__html__);

require('dotenv').config()
console.log(`Database name is ${process.env.COMPONENT_KEY}`);

figma.ui.onmessage = async (pluginMessage) => {

  await figma.loadFontAsync({ family: "Roboto Slab", style: "Regular" })
  console.log(pluginMessage)

  // get currently selected frame component key
  //figma.currentPage.selection[0].key

  const key = "key"
  figma.importComponentSetByKeyAsync(key).then((postComponentSet) => {
    console.log(postComponentSet); 
  
    const nodes:SceneNode[] = [];
  
    let selectedVarient;

  //  if(pluginMessage.type === 'create-note'){
    switch(pluginMessage.noteVariant) {
      case "2":
          selectedVarient = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Type=01. Note with title") as ComponentNode;
          break;
      default:
          selectedVarient = postComponentSet.defaultVariant as ComponentNode;
          break;
    }
//  }

    const newPost = selectedVarient.createInstance();
    const noteDescription = newPost.findOne(node => node.type == "TEXT" && node.name == "title") as TextNode;

    noteDescription.characters = pluginMessage.description;
    nodes.push(newPost);
    figma.viewport.scrollAndZoomIntoView(nodes);

  // figma.closePlugin();
  })
};
