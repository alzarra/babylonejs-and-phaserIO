
        var canvas = document.getElementById("renderCanvas");

        var createScene = function () {
            var scene = new BABYLON.Scene(engine);
            // postion of the camera and how rotation work
            scene.clearColor = new BABYLON.Color3(0, 0, 0); 
            var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
        	
        	//Light direction is up and left

        	// Add lights to the scene
			var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
			//var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
		
        	//var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 0, 0), scene);
        	// light.diffuse = new BABYLON.Color3(0, 0, 0);
        	// light.specular = new BABYLON.Color3(0, 0, 0);
        	// light.groundColor = new BABYLON.Color3(0, 0, 0);
        	
        	var earth = new BABYLON.StandardMaterial("earth", scene);
        	earth.diffuseTexture = new BABYLON.Texture("textures/earth.jpg", scene);

        	var moon = new BABYLON.StandardMaterial("moon", scene);
        	moon.diffuseTexture = new BABYLON.Texture("textures/moon.jpg", scene);

        	var sun = new BABYLON.StandardMaterial("sun", scene);
        	sun.diffuseTexture = new BABYLON.Texture("textures/sun.jpg", scene);
        	
        	
        	
        	//diffuse texture
        	var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
        	//sphere0.position.x = -1.5;
        	sphere0.material = earth;	
        	
        	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: .2, diameterX: .2}, scene);
        	sphere1.position.x = -2;
        	sphere1.material = moon;

        	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 150, diameterX: 150}, scene);
        	sphere2.position.x = 1000;
        	sphere2.material = sun;
        	

        	// add music to the scene
			var music = new BABYLON.Sound("Music", "msuic/space.mp3", scene, null, { loop: true, autoplay: true });

			var frameRate = 1;
			var animationEarth = new BABYLON.Animation("yAnimation", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);	

			// animation keys
			var keyFramesR = [];
				keyFramesR.push({
					frame: frameRate,
					value: Math.PI
				});

			keyFramesR.push({
				frame: 90*frameRate,
				value: 9*Math.PI
			});

			keyFramesR.push({
				frame: 60*frameRate,
				value: 60*Math.PI
			});

			//adding key to the animation object
			animationEarth.setKeys(keyFramesR);

			//add the animation object to sphere
			sphere0.animations.push(animationEarth);

			scene.beginAnimation(sphere0, 0, 60, true);


        	    
            return scene;
        
        };
        
        var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        var scene = createScene();

        engine.runRenderLoop(function () {
            if (scene) {
                scene.render();
            }
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });