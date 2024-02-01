import { useState } from 'react';

export default function selectOption(){
const [selectedMeme, setselectedMeme]= useState(null);
return (
    
    {selectedMeme && (
        
    <div>
         <p>Selected Meme : {selectedMeme.name}</p>
         <img src={`data:image/png;base64,${selectedMeme.base64}`} alt ={selectedMeme.name}/>
     </div>
 )}

)
}


