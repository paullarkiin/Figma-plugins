
figma.showUI(__html__);

figma.ui.onmessage = async (pluginMessage) => {

  await figma.loadFontAsync({ family: "Roboto Slab", style: "Regular" })

  // need to look this up more for in other files.
  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "Notes") as ComponentSetNode;
  const nodes:SceneNode[] = [];

  console.log(pluginMessage)
  console.log(postComponentSet);
  
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
};
