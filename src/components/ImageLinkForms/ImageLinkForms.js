import React from 'react';
import './ImageLinkForms.css';


const ImageLinkForms = ({OnInputChange, onSubmit}) =>	{
	return(
		<div>
			<p className='f3'>
		  	 {'This Brain Will Detect Faces On Your Pictures Paste A Link In .JPG Format'}
		 	</p>
		 <div className='center'>
		 	<div className='form center pa4 br3 shadow-5'>
		 		<input className='f4 pa2 w-70 center' type='Text' placeholder= 'Paste Link' onChange={OnInputChange} />
		 		<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ' onClick={onSubmit} >Detect</button>
		    </div>
		 </div>
		</div>

	);
}

export default ImageLinkForms;