function Graphics()
{
	let canv = document.getElementById( "TheGame" )
	let ctx = canv.getContext( "2d" )

	this.ScreenWidth = canv.width
	this.ScreenHeight = canv.height
	
	const images = []
	// 
	{
		const scaleAmount = 3
		canv.width *= scaleAmount
		canv.height *= scaleAmount
		ctx.scale( scaleAmount,scaleAmount )

		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
	}
	this.LoadImage = ( url ) =>
	{
		const tempImg = new Image()
		tempImg.src = url

		for( let i = 0; i < images.length; ++i )
		{
			if( images[i].src == tempImg.src )
			{
				return( i )
			}
		}

		images.push( tempImg )

		return( images.length - 1 )
	}
	this.DrawImage = ( index,pos,expand ) =>
	{
		const img = images[index]
		ctx.drawImage( img,pos.x,pos.y,
			img.width * expand.x,img.height * expand.y )
	}
	this.DrawRect = ( x,y,width,height,col ) =>
	{
		ctx.fillStyle = col
		ctx.fillRect( x,y,width,height )
	}
	this.DrawRect2 = ( pos,size,col ) =>
	{
		this.DrawRect( pos.x,pos.y,size.x,size.y,col )
	}
	this.GetCenter = () =>
	{
		return( Vec2( this.ScreenWidth / 2,this.ScreenHeight / 2 ) )
	}
	this.GetScreenSize = () =>
	{
		return( Vec2( this.ScreenWidth,this.ScreenHeight ) )
	}
}