function _Vec2( x,y )
{
	this.x = x
	this.y = y
	// 
	this.Add = ( other ) =>
	{
		this.x += other.x
		this.y += other.y

		return( this )
	}
	this.GetAdd = ( other ) =>
	{
		return( this.Copy().Add( other ) )
	}
	this.Add2 = ( xAdd,yAdd ) =>
	{
		this.x += xAdd
		this.y += yAdd
		
		return( this )
	}
	this.GetAdd2 = ( xAdd,yAdd ) =>
	{
		return( this.Copy().Add2( xAdd,yAdd ) )
	}
	this.Sub = ( other ) =>
	{
		this.x -= other.x
		this.y -= other.y

		return( this )
	}
	this.GetSub = ( other ) =>
	{
		return( this.Copy().Sub( other ) )
	}
	this.Div = ( amount ) =>
	{
		this.x /= amount
		this.y /= amount

		return( this )
	}
	this.GetDiv = ( amount ) =>
	{
		return ( this.Copy().Div( amount ) )
	}
	this.Div2 = ( other ) =>
	{
		this.x /= other.x
		this.y /= other.y

		return( this )
	}
	this.GetDiv2 = ( other ) =>
	{
		return( this.Copy().Div2( other ) )
	}
	this.GetCenter = ( size ) =>
	{
		return( this.GetSub( size.GetDiv( 2 ) ) )
	}
	this.GetLenSq = () =>
	{
		return( this.x * this.x + this.y * this.y )
	}
	this.GetLen = () =>
	{
		return( Math.sqrt( this.GetLenSq() ) )
	}
	this.Set = ( updated ) =>
	{
		this.x = updated.x
		this.y = updated.y

		return( this )
	}
	this.Copy = () =>
	{
		return( Vec2( this.x,this.y ) )
	}
}

const Vec2 = ( x,y ) =>
{
	return( new _Vec2( x,y ) )
}