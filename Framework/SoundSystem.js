function SoundSystem()
{
	function AudioType( url,layer )
	{
		this.data = new Audio( url )
		this.myLayer = layer
	}
	// 
	const sounds = []
	// 
	this.LoadSound = ( url ) =>
	{
		for( let i in sounds )
		{
			const tempAud = new AudioType( url,0 )
			if( sounds[i].data.src == tempAud.data.src ) return ( i )
		}

		sounds.push( new AudioType( url,0 ) )

		return ( sounds.length - 1 )
	}
	this.Play = ( id,vol = 1.0,layer = 0 ) =>
	{
		if( layer < 0 ) console.log( "NOTE: Audio layer minimum should be 0!" )
		sounds[id].data.volume = vol
		sounds[id].myLayer = layer
		sounds[id].data.play()
	}
	this.Play2 = ( id,vol,looping,layer = 0 ) =>
	{
		if( layer < 0 ) console.log( "NOTE: Audio layer minimum should be 0!" )
		sounds[id].myLayer = layer
		sounds[id].data.volume = vol
		sounds[id].data.loop = looping
		sounds[id].data.play()
	}
	this.Stop = ( id ) =>
	{
		sounds[id].data.loop = false
		sounds[id].data.pause()
		sounds[id].data.currentTime = 0
	}
	this.StopAll = ( layer = -1 ) =>
	{
		if( layer == -1 )
		{
			for( let i in sounds ) this.Stop( i )
		}
		else
		{
			for( let i in sounds )
			{
				if( sounds[i].myLayer == layer )
				{
					this.Stop( i )
				}
			}
		}
	}
	this.HasPlayed = ( id ) =>
	{
		return( sounds[id].data.currentTime >= sounds[id].data.duration )
	}
}