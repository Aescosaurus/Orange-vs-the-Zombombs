function _Timer( theMaxTime )
{
	let curTime = 0.0
	let maxTime = theMaxTime
	// 
	this.Update = () =>
	{
		this.UpdateWithAmount( 1 )
	}
	this.UpdateWithAmount = ( amount ) =>
	{
		if( curTime <= maxTime ) curTime += amount
	}
	this.Reset = () =>
	{
		curTime = 0.0
	}
	this.SetMaxTime = ( newMaxTime ) =>
	{
		maxTime = newMaxTime
	}
	this.IsDone = () =>
	{
		return( curTime >= maxTime )
	}
}

const Timer = ( maxTime ) =>
{
	return ( new _Timer( maxTime ) )
}