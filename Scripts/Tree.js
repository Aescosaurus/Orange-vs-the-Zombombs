function Tree( start,gfx )
{
	const pos = start
	const size = Vec2( 32,32 )
	const sprs = [
		gfx.LoadImage( "Sprites/Tree1.png" )
	]
	const mySpr = sprs[0]
	// 
	this.Draw = ( gfx ) =>
	{
		// gfx.DrawRect2( pos.GetCenter( size ),size,"green" )
		gfx.DrawImage( mySpr,pos.GetCenter( size ),Vec2( 2,2 ) )
	}
	this.MoveBy = ( xAmount ) =>
	{
		pos.Sub( Vec2( xAmount,0.0 ) )
	}
}