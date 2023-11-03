import './button.css'

export default function Button(props){
    return(
        <button onClick={()=>{
            var url = props.to;
            window.location.href = url;}
        }>{props.title}</button>
    )
}