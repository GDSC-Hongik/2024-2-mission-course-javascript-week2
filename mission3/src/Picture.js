import tenet from './tenet.jpg';

function Picture(){
    return (
        <div className="pic">
            <img src={tenet} alt="TENET" width="400" />
        </div>
    )
}

export default Picture