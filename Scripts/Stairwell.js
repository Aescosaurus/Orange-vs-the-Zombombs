function Stairwell( start,gfx,sfx )
{
	const pos = start;
	const size = Vec2( 16,16 )
	const hitbox = Collider( pos,size )
	const mySpr = gfx.LoadImage( "Sprites/DoorSpr.png" )
	// 
	this.Draw = ( gfx ) =>
	{
		// gfx.DrawRect2( pos,size,"green" )
		gfx.DrawImage( mySpr,pos,Vec2( 2,2 ) )
	}
	this.MoveBy = ( xAmount ) =>
	{
		pos.Sub( Vec2( xAmount,0.0 ) )
		hitbox.MoveTo( pos )
		// console.log( pos )
	}
	this.MoveTo = ( where ) =>
	{
		pos.Set( where )
		hitbox.MoveTo( pos )
	}
	this.GetRect = () =>
	{
		return( hitbox )
	}
}