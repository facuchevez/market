import { Waveform } from '@uiball/loaders'
import './Loading.css'


function Loading({children,loading}){
    if(loading){
        return(
            <div className="loading">
                <Waveform size={40} lineWeight={3.5} speed={1} color="#6419e6"/>
            </div>
        )
    }else{
        return(
            <>
                {children}
            </>
        )
    }


    
}

export default Loading