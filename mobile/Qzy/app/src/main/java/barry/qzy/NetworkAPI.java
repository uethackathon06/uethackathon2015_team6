package barry.qzy;

/**
 * Created by barry on 20/11/2015.
 */
public class NetworkAPI {
    public static void  signin(String   username , String   password) {

    }

    public static Test  getTest(String  username , String  test_URL) {
        Test    mTest = new Test();
        mTest.title = "Bai kt";
        mTest.quizs = new Quiz[4];
        for (int i = 0; i < 4; i++) {
            mTest.quizs[i] = new Quiz();
        }
        return mTest;
    }

    public static Quiz  getQuiz(String  username) {
        return new Quiz();
    }
}
