import * as React from "react";
import Grid from "@mui/material/Grid";
import Link  from 'next/link';

function App() {
  return (
    <>
      <div className="homepage">
        <div className="homeHeader">
          <p className="homeheaderbig">D I S H A</p>
          <p className="homeheadersmall">
            <span>D</span>IGITAL <span>I</span>NITIATIVE FOR <span>SH</span>
            ARING <span>A</span>CADEMIC ASSETS
          </p>
          {/* <p className="homeheaderlink">
            <span className="homeheaderline">-</span> disha.mbm.ac.in{" "}
            <span className="homeheaderline">-</span>
          </p> */}
          <div>
            <p className="homeheaderother">AN INITIATIVE BY:</p>
            <div className="mbmu_details"></div>
          </div>
        </div>
        <br />

        <div className="container">
        <div className="homeitem">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="item">
                    <div className="icon library"></div>
                  <div className="itemtext ">
                  <Link href="/library"><a className="home_link">Onilne Catalogue</a></Link>
                    <p>Catalogue of Books in Department Library</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="item">
                    <div className="icon academic"></div>
                  <div className="itemtext ">
                  <Link href="/academic_resources"><a className="home_link">Academic Resources</a></Link>
                    <p>Syllabus, Old papers, Video playlists</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="item">
                    <div className="icon research"></div>
                  <div className="itemtext">
                  <Link href="/research_docs"><a className="home_link">Research Docs</a></Link>
                    <p>Selected Theses, Papers & Student Reports</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="item">
                    <div className="icon certificate"></div>
                  <div className="itemtext ">
                  <Link href="/ecertificates"><a className="home_link">E-Certificates</a></Link>
                    <p>Verify and Save E-Certificates</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="item">
                    <div className="icon techno"></div>
                  <div className="itemtext ">
                  <Link href="#!"><a className="home_link">Technology Roadmaps</a></Link>
                    <p>Curated collections of learning resources *</p>
                    <p className='small'>*Coming Soon..</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
