function ParallaxHandler( gfx )
{
	const bg1 = gfx.LoadImage( "Sprites/Parallax1.png" )
	const bg1Pos = Vec2( 100,0 )
	const bg1Speed = 0.16
	const bg2 = gfx.LoadImage( "Sprites/Parallax2.png" )
	const bg2Pos = Vec2( 0,0 )
	const bg2Speed = bg1Speed * 0.78
	// -----
	this.UpdateWith = ( xAmount ) =>
	{
		bg1Pos.x -= xAmount * bg1Speed
		bg2Pos.x -= xAmount * bg2Speed
	}
	this.Draw = ( gfx ) =>
	{
		gfx.DrawImage( bg1,bg1Pos,Vec2( 2,2 ) )
		gfx.DrawImage( bg2,bg2Pos,Vec2( 2,2 ) )
	}
	this.Reset = () =>
	{
		bg1Pos.Set( Vec2( 100,0 ) )
		bg2Pos.Set( Vec2( 0,0 ) )
	}
}