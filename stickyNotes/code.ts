
figma.showUI(__html__);

figma.ui.resize(300,300)

figma.ui.onmessage = async (pluginMessage) => {

  await figma.loadFontAsync({ family: "Roboto Slab", style: "Regular" })
  console.log(pluginMessage)


  // get currently selected frame component key
  //figma.currentPage.selection[0].key

  const componentKey = "b0a6963d646ea1e22cb38756600ee42d8d690340"
  figma.importComponentSetByKeyAsync(componentKey).then((noteComponentSet) => {
  
    const nodes:SceneNode[] = [];
  
    let selectedVarient = noteComponentSet.defaultVariant as ComponentNode;

    if(selectedVarient == null) {
      figma.notify('Error please try again')
    }else{
      const newPost = selectedVarient.createInstance();
   
      switch(pluginMessage.noteColorVariant) {
        case "purple":
          newPost.fills = [{type: 'SOLID', color: {r: 0.82, g: 0.78, b: 0.98}}]
          break;
        case "pink":
          newPost.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.73, b: 0.79}}]
          break;
        case "green":
         newPost.fills = [{type: 'SOLID', color: {r: 0.74, g: 0.91, b: 0.78}}]
          break;
        case "white":
          newPost.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
          break
        default:
            break;
      }

      const noteDescription = newPost.findOne(node => node.type == "TEXT" && node.name == "body") as TextNode;
      
      try {
        noteDescription.characters = pluginMessage.description;
      }
      catch(err) {
        figma.notify('Failed to load component font!')
      }

      nodes.push(newPost);
      figma.viewport.scrollAndZoomIntoView(nodes);
    }
    
  // figma.closePlugin();
  })
};
