function Zombomb( start,gfx,sfx )
{
	const pos = start
	const size = Vec2( 16,16 )
	const hitbox = Collider( pos,size )
	const beepNoise = sfx.LoadSound( "Audio/BombBeep.wav" )
	const activationDist = 275.5
	const activationDistSq = activationDist * activationDist
	const maxBeepTime = 2.5 * 30
	const minBeepTime = 1.05 * 30
	const beepTimer = Timer( maxBeepTime )
	let dead = false
	const disarmSound = sfx.LoadSound( "Audio/Disarm.wav" )

	const mySprite = gfx.LoadImage( "Sprites/Zombomb.png" )
	// 
	this.Update = ( playerPos ) =>
	{
		// Stop beeping if player has cleared the zombomb.
		if( playerPos.x > pos.x )
		{
			sfx.Play( disarmSound,g_voiceVol )
			dead = true
		}

		const diff = pos.GetSub( playerPos )
		const diffLen = diff.GetLenSq()
		if( diffLen < activationDistSq )
		{
			beepTimer.Update()

			if( beepTimer.IsDone() )
			{
				sfx.Stop( beepNoise )
				sfx.Play( beepNoise,0.8 * g_soundVol )

				beepTimer.Reset()

				const intensity = diffLen / activationDistSq
				beepTimer.SetMaxTime( ( intensity * ( 1 + maxBeepTime - minBeepTime ) ) + minBeepTime )
				// console.log( intensity )
			}
		}
	}
	this.Draw = ( gfx ) =>
	{
		// gfx.DrawRect( hitbox.x,hitbox.y,hitbox.width,hitbox.height,"orange" )
		gfx.DrawImage( mySprite,Vec2( hitbox.x,hitbox.y ),
			Vec2( 2,2 ) )
	}
	this.MoveBy = ( amount ) =>
	{
		const moveAmount = Vec2( amount,0.0 )
		pos.Sub( moveAmount )
		hitbox.MoveTo( pos )
	}
	this.IsDead = () =>
	{
		return( dead )
	}
	this.GetRect = () =>
	{
		return( hitbox )
	}
}