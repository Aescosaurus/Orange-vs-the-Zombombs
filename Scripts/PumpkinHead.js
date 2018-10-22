function Pumpkinhead( gfx,sfx )
{
	const pos = gfx.GetScreenSize().GetDiv( 2 )
	const size = Vec2( 16,16 )
	let deltaMoveX = 0.0
	const moveSpeed = 0.6

	let jumping = false
	let grav = 0.0
	const gravAcc = 0.011
	const jumpPower = 1.1
	let canJump = false

	const hitbox = Collider( pos,size )

	const footstepTimer = Timer( 0.61 )
	let leftFootDown = false

	const hitWallSound = sfx.LoadSound( "Audio/HitWall.wav" )
	const leftFootSound = sfx.LoadSound( "Audio/Footstep1.wav" )
	const rightFootSound = sfx.LoadSound( "Audio/Footstep2.wav" )
	const jumpSound = sfx.LoadSound( "Audio/JumpSound.wav" )
	const landingSound = sfx.LoadSound( "Audio/LandSound.wav" )

	const anims = [
		gfx.LoadImage( "Sprites/Orange1.png" ),
		gfx.LoadImage( "Sprites/Orange2.png" )
	]
	const animSpeed = 0.03
	let animSpot = 0
	// 
	this.Update = ( kbd,map ) =>
	{
		let testMove = Vec2( 0,0 )

		if( kbd.AnyAreDown( [ Keyboard.A,
			Keyboard.J,Keyboard.Left ] ) ) // Left.
		{
			testMove.x -= moveSpeed
		}
		if( kbd.AnyAreDown( [ Keyboard.D,
			Keyboard.L,Keyboard.Right ] ) ) // Right.
		{
			testMove.x += moveSpeed
		}

		if( canJump && kbd.AnyAreDown( [ Keyboard.W,
			Keyboard.I,Keyboard.Up,Keyboard.Space ] ) ) // Jumping.
		{
			jumping = true
			canJump = false
			sfx.Play( jumpSound,g_soundVol )
		}

		grav += gravAcc

		if( jumping ) testMove.y -= jumpPower

		// if( map.GetTileAt( testMove ) != 0 ) grav = 0.0

		testMove.y += grav

		if( jumping && grav > jumpPower )
		{
			jumping = false
			grav = 0.0
		}
		
		const xOrYHit = hitbox.TryMovement( testMove,map )
		if( xOrYHit.x > 0 ) sfx.Play( hitWallSound,g_soundVol )
		if( xOrYHit.y > 0 )
		{
			if( !canJump ) sfx.Play( landingSound,g_soundVol )
			grav = 0.0
			canJump = true
			jumping = false
		}

		footstepTimer.Update()

		if( testMove.x != 0 && canJump )
		{
			animSpot += animSpeed

			if( animSpot > 1.999 ) animSpot = 0

			if( footstepTimer.IsDone() )
			{
				footstepTimer.Reset()
				if( leftFootDown ) sfx.Play2( leftFootSound,0.4 * g_soundVol,false )
				else sfx.Play2( rightFootSound,0.4 * g_soundVol,false )
			}
		}
		else animSpot = 0

		pos.Add2( 0.0,testMove.y )
		deltaMoveX += testMove.x

		hitbox.MoveTo( pos.GetCenter( size ) )
	}
	this.Draw = ( gfx ) =>
	{
		// gfx.DrawRect2( pos.GetCenter( size ),size,"#FFFFFF" )
		// 
		// gfx.DrawRect( hitbox.x,hitbox.y,hitbox.width,hitbox.height,"red" )
		gfx.DrawImage( anims[Math.floor( animSpot )],pos.GetCenter( size ),Vec2( 2,2 ) )
	}
	this.ResetDelta = () =>
	{
		deltaMoveX = 0.0
	}
	this.GetDelta = () =>
	{
		return( deltaMoveX )
	}
	this.GetPos = () =>
	{
		return( pos )
	}
	this.GetRect = () =>
	{
		return( hitbox )
	}
}