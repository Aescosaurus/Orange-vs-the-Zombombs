function _Collider( pos,size )
{
	this.x = pos.x
	this.y = pos.y
	this.width = size.x
	this.height = size.y
	// 
	this.MoveTo = ( newPos ) =>
	{
		this.x = newPos.x
		this.y = newPos.y

		return( this )
	}
	this.MoveBy = ( xAmount,yAmount ) =>
	{
		this.x += xAmount
		this.y += yAmount

		return( this )
	}
	// Returns a new valid testMove to apply to position.
	this.TryMovement = ( testMoveRef,tilemap ) =>
	{
		const xOrYColliding = Vec2( 0,0 )
		const xTest = this.Copy().MoveBy( testMoveRef.x,0.0 )
		const yTest = this.Copy().MoveBy( 0.0,testMoveRef.y )

		if( xTest.IsColliding( tilemap ) )
		{
			testMoveRef.x = 0.0
			xOrYColliding.x = 1
		}
		if( yTest.IsColliding( tilemap ) )
		{
			testMoveRef.y = 0.0
			xOrYColliding.y = 1
		}

		return( xOrYColliding )
	}
	this.IsColliding = ( tilemap ) =>
	{
		let colliding = false

		if( tilemap.GetTileAt( Vec2( this.x + this.width / 2,this.y + this.height / 2 ) ) > -1 || // Center.
			tilemap.GetTileAt( Vec2( this.x,this.y ) ) > -1 || // Top left.
			tilemap.GetTileAt( Vec2( this.x + this.width,this.y ) ) > -1 || // Top right.
			tilemap.GetTileAt( Vec2( this.x + this.width,this.y + this.height ) ) > -1 || // Bot right
			tilemap.GetTileAt( Vec2( this.x,this.y + this.height ) ) > -1 ) // Bot left.
		{
			colliding = true
		}

		return( colliding )
	}
	this.IsOverlappingWith = ( other ) =>
	{
		return( other.x < this.x + this.width && other.x + other.width > this.x &&
			other.y < this.y + this.height && other.y + other.height > this.y )
	}
	this.Copy = () =>
	{
		return( new _Collider( Vec2( this.x,this.y ),Vec2( this.width,this.height ) ) )
	}
}

const Collider = ( pos,size ) =>
{
	return( new _Collider( pos,size ) )
}