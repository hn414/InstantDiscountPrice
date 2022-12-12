import * as React from 'react';
import { useState, useEffect } from "react";
import { ImageBackground, FlatList, StyleSheet,TouchableOpacity, View, Text, TextInput, Image, Alert, SafeAreaView, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import background from './assets/background.png'
import homeScreen from './assets/homescreen.png'
import brown from './assets/brown.png'
import tag from './assets/tag.png'
import * as SQLite from "expo-sqlite";
import * as WebBrowser from 'expo-web-browser';

SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);


  function ListDetailsScreen() {
    const [store, setStore] = useState([
      {
        id: 1,
        name: "Target",
        imageUrl: "data:image/png;base64,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",
        url: "https://www.target.com/"
      },
      {
        id: 2,
        name: "Walmart",
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEhUTEhAVFhUVFRcVFRcXFRUVFRcVFRUXFhcXFRcYHSggGBolGxcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAYFB//EAEAQAAIBAgIECAwDCQEBAAAAAAABAgMRBCESMUFRBQYTYXGBkZIHFBYiMjRSVHOhstJysfAXI0JTYmPB0eEk8f/EABsBAQACAwEBAAAAAAAAAAAAAAAEBgEDBQIH/8QAPxEAAQIDAwkGBAQEBwEAAAAAAQACAwQRBSExBhIUQVFSYXGRcoGhscHREyIzNCMyQvAkwuHxFUNTYoKy0hb/2gAMAwEAAhEDEQA/APcSnW9Jhyst5NTgmrtZhEmF1PpFxGrrG1no6shKb0nZ5hFHT1rpLpDOCSbS1EPKy3hE2Wss0PRX62iqktxDUk07LJBE7FbOv/AzD+kPo+de+dh1WKSusmEUk9T6CkSRqO+ssclHcERT1LoRBidfUJKo02k9RJTipK7zCJMNtH1vRf62javm6shlObbs3kEUSL5HyUdxX5WW8Ikq62TYXU+kdGCau1mR1HouyyCJ+J1dZBS1okpvSdnmPnBJXSzCKYoMfyst5Y5KO4Iko+iv1tGYnYNqTadk8h9LzteYRMw2vqJ6mp9DI6kVFXWTI41G2k2EUYFzko7hAiZ4ut7EdXRy3DuXXOMlTcs1tCJtSpFRc5yUYxTbbdkks222YnhLj8oyaw9PSXtzuk+iKzt0tdAeEfHyioYdSyl59Rb0mlFdF1J9SMN/3p2a1sO7Z1nQ3wxFiitcBfSm07a9KeHFn597H/Dh3UxPH9/sUv1cuP8Ai9sKPdl9xH5dYn+XR7svuMv1dQN8/wCe3WdXQpc/5Y6KBpsxvnwWs/aBivYo91/cMlx8xL1wo92X3GXv0b9gg0KX3B0WNNmN8+C1UOP2KWqFHuy+4Jcf8U9cKPdl9xkwGhS+4OiadMb58Fq1x7xPsUe7L7h/7QcV7FHuy+8yIGRJS+4Oixp0xvnwWrfHvE+xR7svuFjx/wAUtUKPdl9xkwMaDL7g6LOnTG+fBayfH7FPXCj3ZfcJHj5iVmoUe7L7jKANBl9wdE06Y3z4LXftBxXsUe6/uI/LzE/y6Xdl9xlQGgyx/QOiadMb58PZa1eEDFL+Cj3X9w2fH7EvXCj3ZfcZQQzoUvuDosadMb58FrI8f8StUKPdl9w5+EHFP+Cj3X9xkhBoMt/pjomnTG+fBary9xP8ql3ZfcSftCxXsUu6/uMgBnQZbcHRNOmd8+C2uC8IEtL9/RjZ63BuLXVK6fajcYDH06lNVKU1OEtuqzWxrWnzM8TNNxA4RdPEKlfzK2VnqUkrxfTk11nOn7MhiGYkIUIvpqI9Dru6KbJWjEzwyKag69YXqCnpZMV0Us76s+wSMNHN/IV1U8s88u0ri7yb4w9wCeLvmAImcm9zLEJJJJslKdb0mEXnnhKd8VC2f7mP1TMpc0/hE9Yh8GP1TMv/APC4yX28PkFVZ77h/P0CG/1tEvbVsesXq/SETJSipUNHXGmUQAAFhAAARB2MHxerTV29Ddpa7dC/zYpcERTr001daSyN4VDKi349muhwoDRVwJJN9ADSgGFdpNbsLyaWCxbKhTYdEik0BpQXaq1J8qLJ4ji1VirwlGXNmvzy+ZxZRabTVmsmnk0+c9GMXxtcY4hWVm4Jy582k+xfIi5NZSTM9MOl5gA/KXBwFKUIFCK0INcQAQca1qN1sWPBloQiwSRfQgmta7NdRsvuwpQ15gCXAvSrKBRACIEADKwgUBplEHW4qeuYf4kTknV4qeuYf4kTTMfRf2XeRWyX+qzmPML2Ws7rLMhhBprLaOw2vqJ6mp9DKMrkjlFvQFMAiW73lqiskJyEd3zZFOo07LUgi868JnrUfgx+qZk30Gp8I8r4mF/5MfqmZUuUlfLw+QVVnvuH8/RFgYCEpREAABEAABEAABFZ4PlarB7pL80b5nnKds92fYejXPnWXsP5pZ/CIOmYfUq3ZLv+WM3i09c72QYLjVK+JnnqUfpN6eecY5f+mq1v/JK/zRCyIh1nYr9kOnVzf/Kk5Ru/hmN2u8mu/oqVGpbJlkok9GpsZ9QadSpThrUwgAbF4QKA0yiAAAsJDrcU/XMP8SJyjq8VPXMP8SJqmPov7LvIrbA+qzmPML2bELIrwea6USQk5Oz1D5U0ldLVmUVXJSaK3AVuVlvECKTxjm+YclpZ3tcZyMiWNRJWetBF5p4SI2xMV/Zj9UzKtmr8JMr4mL/sx+qZki5SP27OQVVnvuH8/RAAS4Wjp1Iw9qS/OxJJAFSaBRQCTQC8q/wVwLOr5z82HRdvqLWN4tySvTlp/wBLWfU9T+RpqdNRSilZJWS5kPPk8bLOffMfFhECHqYQCCP9xpnVOujgAbqXX3mHk/KiFmPBLtbq314aqdx2m9ecsQ23CfBNOtm8p+0lr5pLaZLHYGpSlaUbLY1mn+u0vtj2/K2k2jPlfrYcebTg4crxrAVYtCyo0mam9u8PUYg/utVWAAO4uYklqPQ8LK8IPfGL+SPPTecFTvSg/wCn8lYo+Xbf4WC/Y8jq0n+VWbJg0ixBwHgf6q2ea8KVNKtUa2zl83c9KbsrnllSV23vbfayBkLD+aYedjB/3r5KVlK/5YTeLj0oPVNHCIVI+hKqKenO44bhMPOclGEW5P8AWfMbLgjgGNO0p2lPYv4Yvm3vnOfaltytmQ86MauODR+Y+w/3Gg2VNykyVmxpx1IYuGLjgPc8B30XJ4M4AnUSlN6EXq3tf4XOx3CXF6cIucJaVs9G1pJc1jXAfO3ZaWjpHxRm5n+nQUpszqZ1eNQK35tLlbW5PSnwsw1rvVNa8q0pw/uvNBS5w7h1SxE0vRdpR5nLZ23+RSPq0tMMmYTY0P8AK4AjkRUeCo0eC6DEdDfiCR0Qdbip65h/iROQdbil65h/xxMzH0X9l3kVmX+qztDzC9k0NDPWHL3ytry17xZzUlZDFSazezMoquSd4vz/ACAdy8RQidpreivVTu8iMt0fRQReYeEVf+iHwY/VMyprvCZ61H4MfqmZEuckP4dnIKqz33D+foglw1Z05xmtcf8Ad7EQEggEUKigkGoxC3mC4QpVV5slfbF5S7C2ecP9c3OjpYPjJXptKp+8XPlK34v9nzi0siHs+aSfUbjrj3OwP/LN4uJVvk8o2O+WYbQ7zbx3jEd1e5bUjr0I1IuM0pJ7H/jcU+D+GKFa2jKz9mVlLq39R0ClRoMxJxg2I1zHi8YgjiD5EGmwqxMiQ47KtIc0945H2WT4V4AlC8qd5w3a5R+7q/6cO56QZnjXgoRhyscm5Wklqeknnbfl8z6Dk7lVEmIjZSbFXG5rxroMHDu/MBjiNaqtr2IyEwx4FwF5b7H0N2ymCzpo+AuGKcKap1HotPJ5u6bbztqzZm0xS3WlZkC0YHwI9aVBBBoQQCKi4jAkXgi/BcGTnIkpE+JDpWlL8CDTlsGtavhHjHQjCSpz05u6Vr62sm28mugxCRLWp7URojWXY8vZkMw4NbzUlxBJ6AAAX0AGvWb1vnLQizjg6JS7ADAdSTfzQdfgjgKpXzfmw3vb+FbSbirgIVKk3NX0M1HZdv5rI2qVskcLKLKZ0i8y0u38SgJccG1vFB+p2BvuGxxuXTsmx2zLRGin5b6Aa6XXnUK6sTtCr4LA06MdGnG297X0vaWQKeO4SpUV581qvZZyfQj5sBMTkc0DnxHXnFzjxPDjgFbiYUCHqa0dwCuFfF4uFJaVSUYr5vqWbMvwjxrlK6ox0P6nbS7NSM9VrSk9KUnJvW73ZbrOyLjRKPnH5g3W0Lut7W92edVBVcKcyhhM+WAM47TcOmJ8BxVvhvHctVlJKyy0d9tl+faVqc7kSFR9Il4TIENsKGKNaAAOAuCqEZ7ori9+JNT3qc63FP1zD/jiciLOvxS9cw/xIm2Yvgv7LvIrXA+sztDzC9ioqzzyJpyVnnsG4jV1kFPWulFFVzSaL3PsAvAETNBbl2FerJpuzF5eXMSRpqWb2hF5l4RX/wCiHwY/VMyprfCTG2Jiv7MfqmZIuUj9uzkFVZ77h/P0QAASlEQNnG6sOAIqUo2Z1+DuMNenk3px3SbduvWijVhfpKpEmZWDMQ/hRmhzdhFf7HiKHipMCPEhOz4biDtHrt76hbvCcZcPNedJ03uak+xoz/GPhhV5KMPQjvycv+bulnEFRx5HJyRkpjSIQNdQJqG1FCW660uq4u10pVdCZteZmIXwn0prIFCeeroAn0p26CwVUiWnLZ2FiaVx3KUhnCxONPZFVhWeBuEHQqaVrxl6S/W41dXjHhlG7qNv2VF36M8vmYdxsK0cC08nZO0YrYsbODhd8ppnDY644X0IoaGlcF1JK15iUYWMoRxFaHhQjxqF1uEONFaeVP8Adrmzl3tnUcKUm3dttvW3mwkrCE6UkpeTZ8OAwNHAY8ziTxJJUaPMxZh2dFcXHjq5DAdwCBbAkKSgFpqgUUVI9gLWSiJ2uKfrmH/HE41js8U/XMP8SJiYH4D+y7yK9QPrM7Q8wvYqLu88+nMlnBWeS1DZw0c0MVZvLfkUZXJM03vfaBY5Bc4BFH4u945VNHK2ofy0d/5kM6bbulkEXnHhIlfExf8AZj9UzJmr8I8bYmF/5MfqmZQuUj9uzkFVZ77h/P0QAASlEQAgGUQRVqd81rOpgOCKtbNRtH2nq6tvYaHg/i/Sp5z8+e95RXVt6ziWnb8hIVbFfV4/Q293fqb/AMiF0pOypqZo5jaN3jcO7We4U4hY3CcHVqmcKcpLell2vIglBp2kmmsmmmmuZpnqCikrJWS1JauwzXHLCR0FVXpKWg+dNO1+i3zODZWVumTol3ws1rrmmtTXG+4Y0upgaCpC6c7YWjy5itfUi83UHdrux1rKJDkhYiovAVbKdFijRx7AXhIy1U4MrRjpSpSS32/Pd1nS4q4aM6kpSV9C1t2uy7LGvKdbuVX+HTQl4cIOoAXEmmN4AoDqvqdtwuKsNl2GJuD8V76VuFADhcSe/AAg663rzKUbogsegY7gOjUzcdGW+OXatRm+EeL9annFacd8dfXHX+ZPs/KSz5+jWuzH7r6Ankfyu5A14BRpqx5uWvpnN2tvpzGI8RxXESHWBIcjv5tLiuTnVwSIVIVIcewF5JQdbil65h/iROSdbin65h/xxNUyaQX9l3kVsl/rM7Q8wvZHLTy1ByNs76s+wSnFxd3kh8qiasnryKKrmk8Y5gIuRlu/IAiZYt0fRRIU63pMIvPPCX61H4UfzmZE1XhE9Yh8GP1TMqXOSvlmcgqrPfcP5+iBBxPwbTUq0FLU5K+3dl16uskPcGtLjgBXoozGl7g0ayB1NFZwPAlarZuOjF56Ut3RrZosDwJRp2dtKW+Wq/NHUdNCnx60cq5+dGa13w2HUyoNOLsT3ZoO6r/KWJKyxqRnO2uv6DAeJ4oADi8McYIUbxj59TYv4V0va+ZHGkZCPORBBl2VPQAbScAOJ5CpXQmJmHAZ8SK6g8+WsldLGY2nRjpVJWWze3uS2sxHDfDUsQ0raMIu62uT53+tZQxmLnVlpTk5P5LmS2IgPqNi5NQLPIivOfF26m7c0eGcb8bheFS7QtiJNAsb8rNms8/Yd5KfTkXMLhalR2hDSf5dLKNj0DizR0cNDJXleT57ttX6rE63LY/wuVEUNziXBoBNBeCanXQBvWl4xUWzbP02OWE0AFSRzAoNQN/QFZHFYCrT9OnKPO1/raVj0bE0lKMoyV001Y81pz2PWeMnbddakN5iMDXNIBpgag0pW8YHbzOr1a9liSc3MdUOrjiKU2Y4hX+DeEJUJ6Uc/aW//XSbLgzhOnWXmO0lri/SXOt65zAiwm01KLaktTvZozbmTkvaYz/yxQKBw18HDWNmBGokXHFm2vFkzm/mZs2cQdXHUeBvXpYGc4F4zKVoVspatL+GX4tz+XQaJM+TWjZkxIRPhTDaVwOLXcjr5GhGsBXqVm4UyzPhGvmOY/fBUcfwVRrZyh53tRyfXv6zOY7i1VhnT/eLotLu7eo2QHQszKSfkKMY/OYP0uvFNgOLeABpwKizlkSs1UubR28249+o94XmbVgOnxpSjiJW2pX646/kjmH2KRmmzUvDjtFM5odQ4iorTu2618/moBgRnQia0JFdtP33IOtxS9cw/wASJyTrcU/XMP8Ajie5k0gv7LvIrzL/AFmdoeYXs+I1FenrXSh+G19RPU1PoZRVc08CgARO5WW8npwTV2sw8XW9jJVHHJbAi848JStio/Bj9UzIms8JEr4mD/sx+qZky5yP20PkFVZ77h/P0QCds10rpACWFDK3XBfCEa0E8tJelHc/9FqvXjTi5SkoxWtv9ZnntKq4tOLs1qd7Mjx2Kq1LadSUktV3exQI+Q0MzOdDi5sImubT5hwacKbCRcMQ7FWqFlI4QqOZV+3UeJGPMYHauvwxxllO8aV4w2y/il9v66DOgBbZOSl5OF8KXaGt8SdpOJPE91BcuFMTMWYfnxTU+XADUP2b0DrCC2JgCj1SHpfB0dGnBboR/wAHm1vzPT6MLKMd0VHsWiUfLtwEvAZtc49G0/mVkyZFYkU8G+JPsnHmGKVpyWqz7NZ6geccORtiaqfty+buvkyDkK6kSYbtDD0LvfwUrKVv4cJ3EjqB7KCErjysmTRlc+lsfW5Ux7aXpJxudLgfh6pQtGXnU/ZetfhezoKBHUjtI85JwZqGYcZoc04g+Y2EaiLxqIW6WmYkB4dDdQ7fQ7RwXo+Bx1OrHSpyvvWprma2DsXiYU4Oc3ZL58y3s82w+IlB6UJaL33sx2JxU6jvOcpNas726NxRXZDwzMVEY/C2U+flXC/epUbtb1Z//pHfCvh/Pz+XnTHu8U7H4p1akqjycs7blqXYkiOnLYRpDki+wmCGA1goAAANQAuAVXiOLyS43m/v2qY63FL1zD/EiceLOxxS9cofEie5j6L+y7yK8wPrM7Q8wvZqsUldZEUZttK+0fGelkxXRSzu8s+woiuak5KO4Qi8Ye5AET/GFuYx03LNbSPk5bienNJWbzCLzPwkxtiYL+zH6pmTNd4THfExt/Jj9UzIlzkftofIKqT33D+fogQAJaiIEkriiBFWlGzELE43IbGstovYckSHAhUj0AvJKmwlLTlGP9X/AA9KZ59wNC9emv6o/wCz0E+cZfO/FlmbA89S0eit+S7fw4rtpaOgPug8+4zJrFVL7bPtR6CYfjhStX0vahF9iaIORMTNn3t2wz4OZ/VSsomVlWnY4eRHsuEOi7CIckfUQFSiVKmKRxJCQCtBCiqQGpE5G4mtzNYXtrtSbYckCQqRkBKoR2eKXrlD4kTkHX4peuYf4kTxMfRf2XeRXqB9ZnaHmF7JGGjm/kK6qeWeeXaLVkmrLMhjBpp22lFVzT/F3vQE3Kx3iBFIU63pMZct0dSCLy/wjesQ+DH6pmUNf4TfWo/Bj9UzIF0kPtofIKqT33D+fogAEJaiIABAsJRk4jxDKKNIVIUUALCnwNfQqRna+jLVvszfYTFwqq8Gnv3rpWw86BO2p26Miv27k7CtUNcXlj2ggGlRQ6iKjuIIxOIXVsy13yNW5uc030rQ1wqDfq2g4al6TWrKC0py0UtraSMDxgx6r1rx9FJRjz5t/m38jn1bvW29122IkQ7EyZh2ZEMUvL3kUwzQBcTQVN5pjXC5SrRtl84wMDc1ta41J77vJCQqQJD0i0tC4ZKEhwAbFrQAAETbDgAIg63FP1zD/jick63FL1zD/EiaJm+C/su8it0v9ZnaHmF7FhtfUT1NT6GNxGorwea6UUVXNNAvWAIo+Rju+bIpTadk8kO8Z5heT0s76wi868JuFkp0q9rxcXTk9zTco36nLsZi7ntvCeCp1acqNWOlCaz2NW1NPY07M824V4iYqnJuharDZZqM0v6k7JvnRYbMtCG2GIUQ0Iw5c8LlwrQknmIYjBWuKzYHQ8msf7rU7qDybx/utTuo62lwd4dR7rmaLF3T0PsueB0PJrH+61O6hPJnH+61O6hpcDfHUe6aNF3T0PsueIdHyZx/utTuoPJrH+61O6NMgb46j3TRYu6eh9lzmB0fJnH+61O6g8mcf7rU7qGmQd4dR7rGixd09D7LnAdDyax/utTuoPJrH+6VO6jOmQd4dR7posbdPQ+y5zQyx1PJrH+6VO6hfJrH+61O6jBmoJ/UOo91kS0bdPQ+y5qQp0PJrH+6VO6Hk1j/AHSp3UZ0uCP1DqPdY0WNunofZc8DpeTWP90qd0b5NY/3Sp3UNLg7w6j3TRY26eh9lzwOh5NY/wB1qd1C+TWP90qd1DTIO8Oo900WLunofZc4Do+TOP8AdandQeTWP90qd1DTIO8Oo900WLunofZc47/EPCOpjISS82knOTtdXs4xXTdrsYzAcS8bVaU6fJR2yk0nbbaKzb7D0ni9wHSw1Lk6evXOb9Kct73JbFsOdaFowxCMOGak3XaqqfIyEQxA94oBffrXUpycnZ5ofKmkrpasxrhoZ6w5e+VteXaVhWJR8tLf+QEvi/OARM5CXMPjUUVZ60Saa3rtK9WLbdkET5rSzQQjo5voFoOyzy6chazuss89mYREqqeS25Efi75hsItNZMs6a3rtCJqrojnTcndaiNwe59hPSkkrN2CJtPzNe0Wc1JWQmIztbPozG0VZ55dIRCpNZ7iXllziymrPNFbQe59gRPdJvPfn2j4S0cmOhNWWa1EVdXeWfQETpvT1bBI03F3epC4fK98unIdUkmmk7hEvLoi8XfMM0HufYWtNb12hEyNRJWewbOOlmugZUi23ZMkoOyzyz25BEkI6Ob6B0qiastoVndZZ57MyGnFpq6YRO8XfMS8uh2mt67Sq4Pc+wIpJU3J3Wpiwehr2jqUkkk3YbiM7Wz6MwiWc9LJDFRaz3Z9gUFZ55dJNOas81qCJvjEecUr6D3PsAImluj6KAAiixWtCYbX1AART1NT6CmABFdjqK1b0mIARSYbb1D8R6IAEVaGtdJeAAipVNb6WT4fV1igETcTsIqHpL9bAAIrhQAAit0fRRFidfUABEYbX1E1XUxACKoXkABFUr+k/1sJcNtAAiXEausgp610oACK6AAEX/9k=",
        url: "https://www.walmart.com/"
      },
      {
        id: 3,
        name: "Sams",
        imageUrl: "data:image/png;base64,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",
        url: "https://www.samsclub.com/"
      },
      {
        id: 4,
        name: "Costco",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17auFZrUzOZQ_CGo3cASQLK9AKEk13nLeNQ&usqp=CAU",
        url: "https://www.costco.com/"
      },
      {
        id: 5,
        name: "Amazon",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl07O6vDL8VY3ol5KOCbwNA6jUpt0WTOWMjg&usqp=CAU",
        url: "https://www.amazon.com/"
      }
    ]);
    
    return (
      <View style={styles.container1}>
        <Text style={styles.title}>Store List</Text>
      <FlatList 
        keyExtractor={(item) => item.id} 
        data={store} 
        renderItem={({ item }) => 
          <View>
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.url)}>
          <Image 
            source={{uri: item.imageUrl}} style={{width: 100, height: 100, margin: 5 }}
          />
          <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
          </View>
        }
      />

    </View>
  );
}

  function HomeDetailsScreen() {
    function openDatabase() {
      if (Platform.OS === "web") {
        return {
          transaction: () => {
            return {
              executeSql: () => {},
            };
          },
        };
      }
      const db = SQLite.openDatabase("idpDB.db");
    return db;
  }
    const db = openDatabase();
  
    function Items() {
      const [items, setItems] = useState(null);
    
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            `select id, input, input2, price, date(itemDate) as itemDate from items order by itemDate desc;`,
            [], 
            (_, { rows: { _array } }) => setItems(_array)
          );
        });
      }, []);
      const heading = "IDP List";
  
      if (items === null || items.length === 0) {
        return null;
      }
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>{heading}</Text>
          {items.map(({ id, input, input2, price, itemDate }) => (
            <Text key={id} style={{ fontSize: 20 }}>{itemDate}: {price} (Original Price:{input} Discount Percentage:{input2})</Text>
          ))}
        </View>
      );
    }
    const [input, setInput] = useState(0);
    const [input2, setInput2] = useState(0);
    const [price, setPrice] = useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

  
    useEffect(() => {
      db.transaction((tx) => {
        // tx.executeSql(
        //   "drop table items;"
        // );
        tx.executeSql(
          "create table if not exists items (id integer primary key not null,input real, input2 real,, total real, itemDate real );"
        );
      });
    }, []);

    const calculate = () => {
      // if (input === null || input === "" || input2 === null || input2 === "") {
      //   return false;
      // }
      // if (price === null || price === ""){
      //   return false;
      // }
      if('' === input){
        Alert.alert('Error', 'You must enter Origional Price');
      }else if (isNaN(input)){
        Alert.alert('Error', 'Origional Price must be a number');
      }else if('' === input2){
        Alert.alert('Error', 'You must enter Discount Percentage');
      }else if(isNaN(input2)){
        Alert.alert('Error', 'Discount must be a number');
      }else{
         const price  = (parseFloat((input * (100 - input2)) * 0.01)).toFixed(2);
      setPrice(price);
      
      }
      return price;
      
    };
     const update = () =>{
      db.transaction(
        (tx) => {
          tx.executeSql("insert into items (itemDate, price, input, input2) values (julianday('now'), ?, ?, ?)", [price, input, input2]);
          tx.executeSql("select * from items order by itemDate desc", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
            );
          },
          null,
          forceUpdate
        );
     }
    
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={tag} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Instant Discount Price</Text>
        {Platform.OS === "web" ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
          <Text style={styles.tbar}>
            Expo SQlite is not supported on web!
          </Text>
        </View>
      ) : (
        
          <ScrollView style={styles.content}>
          <TextInput 
          style={styles.input}
          type="number"
          placeholder="Enter the Original Price"
          value={input}
          onChangeText = {newText => setInput(newText)}
        
        />
        <TextInput 
          style={styles.input}
          type="number"
          placeholder="Enter the Discount Percentage"
          value={input2}
          onChangeText = {newText => setInput2(newText)}
        
        />

        <TouchableOpacity onPress={()=> {calculate(); update()}} style={styles.button}>
          <Text style={styles.buttonText}>Get Price</Text>
        </TouchableOpacity>
          <Text style={styles.result}>{price ? 'Your final price is ' + price : ''}</Text>
          <Items></Items>
          </ScrollView>
    
      )}
        </ImageBackground>
      </SafeAreaView>

    //   <View style={styles.container}>
    //     <ImageBackground source={tag} resizeMode="cover" style={styles.image}>
    //     <Text style={styles.title}>Instant Discount Price</Text>
        // <TextInput 
        //   style={styles.input}
        //   type="number"
        //   placeholder="Enter the Original Price"
        //   value={input}
        //   onChangeText = {newText => setInput(newText)}
        
        // />
        // <TextInput 
        //   style={styles.input}
        //   type="number"
        //   placeholder="Enter the Discount Percentage"
        //   value={input2}
        //   onChangeText = {newText => setInput2(newText)}
        
        // />

        // <TouchableOpacity onPress={()=> calculate()} style={styles.button}>
        //   <Text style={styles.buttonText}>Get Price</Text>
        // </TouchableOpacity>
    //     <Text>Your final price is  ${price}</Text>
    //   </ImageBackground>
    // </View>
  );
  }
  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
  }
  
  function HomeScreen({ navigation }) {
    const [ showText, setshowText] = useState(true)
    React.useEffect(()=>{
      const interval = setInterval(()=>{
        setshowText((showText)=> !showText)
      }, 700)
      return ()=>{
        clearInterval(interval)
      }
    })
    return (
      <View style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Welcome to Instant Discount Price </Text>
        <Text style={styles.title}>Tired of Calculating!  </Text>
        <Image source={homeScreen} style={styles.homeScreen} />
        <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('HomeDetails')}>
        <Text style={[styles.blinkingText, {display: showText ? 'none' : 'flex'}]}>TRY ME!!!</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    );
  }
  
  function AboutUsScreen({ navigation }) {
    const [ showText, setshowText] = useState(true)
    React.useEffect(()=>{
      const interval = setInterval(()=>{
        setshowText((showText)=> !showText)
      }, 1500)
      return ()=>{
        clearInterval(interval)
      }
    })

    return (
      <View style={styles.container}>
        <ImageBackground source={brown} resizeMode="cover" style={styles.image}>
        <Text style={styles.title2}>Instant Discount Price </Text>
        <Text style={{fontSize: 30, color: "#EADDCA"}} >Tired of Where to Shop</Text>
        <Text style={{fontSize: 24,  paddingLeft: 45, alignSelf: "flex-start", color: "#F5DEB3"}} >
          Simply click the button below to see the list of top 5 popular shopping website!</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('List')}>
          <Text style={[styles.blinkingText, {display: showText ? 'none' : 'flex'}]}>SHOW ME</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
  
  const HomeStack = createNativeStackNavigator();
  
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="HomeDetails" component={HomeDetailsScreen} />
      </HomeStack.Navigator>
    );
  }
  
  const SettingsStack = createNativeStackNavigator();
  
  function AboutUsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="About Us" component={AboutUsScreen} />
        <SettingsStack.Screen name="List" component={ListDetailsScreen} />
      </SettingsStack.Navigator>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="About Us" component={AboutUsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  title:{
    fontSize: 40,
    alignItems: 'center',
    marginTop: 10,
    fontWeight: "bold"
  },title2:{
    fontSize: 50,
    alignItems: 'center',
    marginTop: 10,
    fontWeight: "bold",
    color: " #C4A484",
  },
  image: {
    flex: 1,
    justifyContent: "center", 
  },
  homeScreen:{
    width: 400, 
    height: 300, 
    marginTop:10,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    height: 40,
    padding: 10,
    color: 'gray',
    marginBottom: 10,
    marginTop: 10,
  },
  button:{
    height: 50,
    width: 150,
    alignItems: "center",
    backgroundColor:'gray',
    margin: 20,
  },
  button1:{
    height: 50,
    width: 150,
    backgroundColor:'#722F37',
    margin: 20,
    alignItems: "center",
  },
  buttonText: {
    color: 'ffffff',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  heading:{
    marginTop: 20,
    fontSize: 30,
    paddingLeft: 20,
    alignSelf: "flex-start",
  },
  text:{
    fontSize: 24,
    paddingLeft: 45,
    alignSelf: "flex-start",
    
  },
  blinkingText:{
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },result: {
    color: '#000',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  item: {
    flex: 1,
    backgroundColor: 'pink',
    fontSize: 20,
    marginTop: 5,
    padding: 5,
    textAlign: "center"
  },
});