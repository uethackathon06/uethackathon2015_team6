package barry.qzy;

import android.app.Activity;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.ActionBar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.support.v4.widget.DrawerLayout;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;


public class MainActivity extends ActionBarActivity
        implements NavigationDrawerFragment.NavigationDrawerCallbacks {

    String      username = "minh";


    void    setUpGetTest() {
        final EditText    testUrl = (EditText) getTestView.findViewById(R.id.test_url);
        Button      getTestButton = (Button) getTestView.findViewById(R.id.get_test);
        getTestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Test    mTest = NetworkAPI.getTest(username, testUrl.getText().toString());
                container.removeView(getTestView);
                container.addView(testView);
                setUpTestView(mTest);
            }
        });
    }

    void    setUpTestView(Test  tTest) {
        TextView    testTitle = (TextView) testView.findViewById(R.id.test_title);
        testTitle.setText(tTest.title);
        TableLayout quizTable = (TableLayout) testView.findViewById(R.id.quizs);
        for (int i = 0; i < tTest.quizs.length; i++) {
            TableRow    tableRow  = new TableRow(this);
            View        quizView  = getLayoutInflater().inflate(R.layout.quiz_layout , null);
            TextView    questionTextView = (TextView) quizView.findViewById(R.id.quiz_question);
            TableLayout answerTable       = (TableLayout) quizView.findViewById(R.id.quiz_answers);

            questionTextView.setText("Câu " + Integer.toString(i+1) + " : " + tTest.quizs[i].question.toString());
            for (int j = 0; j < tTest.quizs[i].answers.length; j++) {
                TableRow    answerRow   = new TableRow(this);
                View        answerView  = getLayoutInflater().inflate(R.layout.answer_layout , null);
                Button      answerButton = (Button) answerView.findViewById(R.id.button);
                answerButton.setText((char) ('A' + j) + ". " + tTest.quizs[i].answers[j].toString());
                answerButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // update answer sheet
                    }
                });

                answerRow.addView(answerView);
                answerTable.addView(answerRow);
            }
            tableRow.addView(quizView);
            quizTable.addView(tableRow);
        }
    }

    /**
     * Fragment managing the behaviors, interactions and presentation of the navigation drawer.
     */
    private NavigationDrawerFragment mNavigationDrawerFragment;

    /**
     * Used to store the last screen title. For use in {@link #restoreActionBar()}.
     */
    private CharSequence mTitle;
    View    testView , quizView , getTestView;
    FrameLayout     container;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mNavigationDrawerFragment = (NavigationDrawerFragment)
                getSupportFragmentManager().findFragmentById(R.id.navigation_drawer);
        mTitle = getTitle();

        // Set up the drawer.
        mNavigationDrawerFragment.setUp(
                R.id.navigation_drawer,
                (DrawerLayout) findViewById(R.id.drawer_layout));

        container = (FrameLayout) findViewById(R.id.container);
        testView = getLayoutInflater().inflate(R.layout.test_layout , null);
        getTestView = getLayoutInflater().inflate(R.layout.get_test_layout , null);
    }

    @Override
    public void onNavigationDrawerItemSelected(int position) {
        // update the main content by replacing fragments
        FragmentManager fragmentManager = getSupportFragmentManager();
        fragmentManager.beginTransaction()
                .replace(R.id.container, PlaceholderFragment.newInstance(position + 1))
                .commit();
    }

    public void onSectionAttached(int number) {
        switch (number) {
            case 1:
                mTitle = getString(R.string.title_section1);
                container.removeAllViews();
                container.addView(getTestView);
                setUpGetTest();
                break;
            case 2:
                mTitle = getString(R.string.title_section2);
                break;
            case 3:
                mTitle = getString(R.string.title_section3);
                break;
        }
    }

    public void restoreActionBar() {
        ActionBar actionBar = getSupportActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
        actionBar.setDisplayShowTitleEnabled(true);
        actionBar.setTitle(mTitle);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (!mNavigationDrawerFragment.isDrawerOpen()) {
            // Only show items in the action bar relevant to this screen
            // if the drawer is not showing. Otherwise, let the drawer
            // decide what to show in the action bar.
            getMenuInflater().inflate(R.menu.main, menu);
            restoreActionBar();
            return true;
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String ARG_SECTION_NUMBER = "section_number";

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);
            return rootView;
        }

        @Override
        public void onAttach(Activity activity) {
            super.onAttach(activity);
            ((MainActivity) activity).onSectionAttached(
                    getArguments().getInt(ARG_SECTION_NUMBER));
        }
    }

}
