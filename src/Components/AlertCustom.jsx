const styles = {
    icon: {
        fontSize: '22px'
    }
}

function AlertCustom({variant,text,icon}){
    return(
        <>
        <div className={`${variant}`}>
            <div>
                <span style={styles.icon}>{icon}</span>
                <span>{text}</span>
            </div>
        </div>
        </>
    )
}

export default AlertCustom