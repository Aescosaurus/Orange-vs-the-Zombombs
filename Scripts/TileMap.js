function TileMap( gfx,sfx,zombombsList,stairs,trees )
{
	const tiles = []
	const tileSize = Vec2( 16,16 )
	// Number of tiles in x and y.
	const screenSize = gfx.GetScreenSize().GetDiv2( tileSize )
	const mapSize = gfx.GetScreenSize().GetDiv2( tileSize )
	const screenOffset = Vec2( 0,0 )
	let playerMoveX = 0.0
	let playerTileGetX = 0.0

	// const tile1Spr = gfx.LoadImage( "Sprites/Tile1.png" )
	const tileSprs = [
		gfx.LoadImage( "Sprites/Tile1.png" ),
		gfx.LoadImage( "Sprites/Tile2.png" ),
		gfx.LoadImage( "Sprites/Tile3.png" )
	]
	// 
	this.Draw = ( gfx ) =>
	{
		for( let y = 0; y < screenSize.y; ++y )
		{
			// screenSize + 1 to draw the extra tile if player moves.
			for( let x = -1; x < mapSize.x; ++x )
			{
				// For performance benefits (actually helps a lot).
				if( x * tileSize.x - playerTileGetX > gfx.ScreenWidth ) break;
				while( x * tileSize.x - playerTileGetX < -tileSize.x ) ++x

				const theTile = this.GetTile( Math
					.floor( x + screenOffset.x ),
					y + screenOffset.y )
				let drawColor = "#000000"
				
				switch( theTile )
				{
				case -1:
				case undefined:
					break
				default:
					gfx.DrawImage( theTile,
						Vec2( x * tileSize.x -
						playerTileGetX,y * tileSize.y ),
						Vec2( 2,2 ) )
					break
				}
			}
		}
	}
	this.LoadMap = ( map ) =>
	{
		zombombsList.splice( 0,zombombsList.length )
		trees.splice( 0,trees.length )
		// screenSize.x = map.MapWidth
		mapSize.x = map.MapWidth

		tiles.length = 0

		// for( let i in map.Data )
		for( let y = 0; y < map.MapHeight; ++y )
		{
			for( let x = 0; x < map.MapWidth; ++x )
			{
				const dataPos = y * map.MapWidth + x

				// tiles.push( map.Data[dataPos] )
				switch( map.Data[dataPos] )
				{
				// case 0:
				// 	tiles.push( -1 )
				// 	break
				case 1:
					tiles.push( tileSprs[Math
						.floor( Math.random() *
						( 1 + tileSprs.length - 1 ) )] )
					break
				default:
					tiles.push( -1 )
				}

				if( map.Data[dataPos] == 2 )
				{
					zombombsList.push( new
						Zombomb( Vec2( x * tileSize.x,
						y * tileSize.y ),gfx,sfx ) )
				}
				else if( map.Data[dataPos] == 3 )
				{
					stairs.MoveTo( Vec2( x * tileSize.x,
						y * tileSize.y ) )
				}
				else if( map.Data[dataPos] == 4 )
				{
					trees.push( new Tree( Vec2( x * tileSize.x,
						y * tileSize.y ),gfx ) )
				}
			}
		}
	}
	this.UpdatePlayerMove = ( playerDelta ) =>
	{
		playerMoveX += playerDelta
		playerTileGetX += playerDelta
		if( playerMoveX >= tileSize.x )
		{
			playerMoveX -= Math.floor( playerMoveX )
		}
		if( playerMoveX <= -tileSize.x )
		{
			playerMoveX += Math.floor( Math.abs( playerMoveX ) )
		}
	}
	this.ResetDelta = () =>
	{
		playerMoveX = 0.0
		playerTileGetX = 0.0
	}
	this.GetTile = ( x,y ) =>
	{
		return( tiles[y * mapSize.x + x] )
	}
	this.GetTileAt = ( worldPos ) =>
	{
		const temp = worldPos.GetDiv2( tileSize )
		temp.x = Math.floor( temp.x + playerTileGetX / tileSize.x )
		temp.y = Math.floor( temp.y )
		return( this.GetTile( temp.x,temp.y ) )
	}
}