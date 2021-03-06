import React from "react";
import { useEffect, useState } from "react";
import { Animated } from "react-native";

import { Small, Original } from "./styles";

const OriginalAnimated = Animated.createAnimatedComponent(Original);

const LazyImage = ({ smallSource, source, aspectRatio, shouldLoad }) => {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
        setTimeout(() => {
            setLoaded(true);
          }, 1000);
    }
  }, [shouldLoad]);

  function handleAnimated() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={2}
    >
      {loaded && (
        <OriginalAnimated
          style={{ opacity }}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimated}
        />
      )}
    </Small>
  );
};

export default LazyImage;
