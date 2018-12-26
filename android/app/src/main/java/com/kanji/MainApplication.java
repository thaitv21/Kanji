package com.kanji;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import net.no_mad.tts.TextToSpeechPackage;
import com.loudspeaker.LoudSpeakerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import net.no_mad.tts.TextToSpeechPackage;
import com.loudspeaker.LoudSpeakerPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new RNViewShotPackage(),
            new RNUUIDGeneratorPackage(),
            new TextToSpeechPackage(),
            new RNGestureHandlerPackage(),
            new SketchCanvasPackage(),
            new VectorIconsPackage(),
            new LoudSpeakerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
