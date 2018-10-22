function Game( gfx,kbd,sfx )
{
	const MakeNextMap = ( nextLevel ) =>
	{
		switch( nextLevel )
		{
			case 1:
				return( new Map1() )
			case 2:
				sfx.Play( sfx.LoadSound( "Voice/CompleteLevel1.wav" ),g_voiceVol )
				return( new Map2() )
			case 3:
				sfx.Play( sfx.LoadSound( "Voice/CompleteLevel2.wav" ),g_voiceVol )
				return( new Map3() )
			case 4:
				sfx.Play( sfx.LoadSound( "Voice/CompleteLevel3.wav" ),g_voiceVol )
				return( new Map4() )
		}
	}
	// -----
	const zombombsList = []
	const trees = []
	let stairs = new Stairwell( Vec2( 9999,9999 ),gfx,sfx );
	const map = new TileMap( gfx,sfx,zombombsList,stairs,trees )
	const player = new Pumpkinhead( gfx,sfx )
	let nCurLevel = 0
	let curMap = MakeNextMap( ++nCurLevel )
	
	let started = false
	const intro = sfx.LoadSound( "Voice/Intro.wav" )
	const mineHitSounds = [
		sfx.LoadSound( "Voice/HitMine1.wav" ),
		sfx.LoadSound( "Voice/HitMine2.wav" ),
		sfx.LoadSound( "Voice/HitMine3.wav" )
	]
	const explodeSound = sfx.LoadSound( "Audio/Explode.wav" )
	const exitSound = sfx.LoadSound( "Audio/EndLevel.wav" )
	
	const music = sfx.LoadSound( "Audio/Dawn of the Zombombs.wav" )

	const parallax = new ParallaxHandler( gfx )
	// -----
	this.Initialize = () =>
	{
		map.LoadMap( curMap )
	}

	this.UpdateGame = () =>
	{
		if( !reallyStarted ) return
		if( sfx.HasPlayed( intro )/* || kbd.KeyDown( ' ' )*/ )
		{
			sfx.Stop( intro )
			// Make sure music is on a different audio layer than sound fx.
			sfx.Play2( music,g_musicVol,true,999 )
			started = true
		}
		else if( !started ) sfx.Play( intro,g_voiceVol )

		if( !started ) return

		player.Update( kbd,map )
		map.UpdatePlayerMove( player.GetDelta() )
		stairs.MoveBy( player.GetDelta() )
		for( let i in trees ) trees[i].MoveBy( player.GetDelta() )

		const playerRect = player.GetRect()
		for( let i in zombombsList )
		{
			zombombsList[i].MoveBy( player.GetDelta() )
			zombombsList[i].Update( player.GetPos() )

			if( playerRect.IsOverlappingWith( zombombsList[i].GetRect() ) )
			{
				player.ResetDelta()
				map.ResetDelta()
				parallax.Reset()
				map.LoadMap( curMap )
				sfx.StopAll( 0 )
				sfx.Stop( music )
				setTimeout( () =>
				{
					sfx.Play2( music,g_musicVol,true,999 )
				},900 )
				sfx.Play( explodeSound,g_voiceVol )
				sfx.Play( mineHitSounds[Math.floor( Math.random() * 3 - 0.00001 )],g_voiceVol )
			}

			if( zombombsList[i].IsDead() )
			{
				zombombsList.splice( i,1 )
			}
		}

		if( playerRect.IsOverlappingWith( stairs.GetRect() ) )
		{
			sfx.Play( exitSound,g_soundVol )
			// Transition to next level.
			player.ResetDelta()
			map.ResetDelta()
			parallax.Reset()
			curMap = MakeNextMap( ++nCurLevel )
			map.LoadMap( curMap )
		}

		parallax.UpdateWith( player.GetDelta() )

		player.ResetDelta()
	}

	this.PresentFrame = () =>
	{
		if( !reallyStarted ) return
		parallax.Draw( gfx )
		map.Draw( gfx )
		for( let i in trees ) trees[i].Draw( gfx )
		stairs.Draw( gfx )
		for( let i in zombombsList ) zombombsList[i].Draw( gfx )
		player.Draw( gfx )
	}
}