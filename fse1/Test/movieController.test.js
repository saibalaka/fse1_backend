const chai=require('chai');
const expect=chai.expect;
const sinon=require('sinon');
const Movie=require('../Models/Movie')
const {addMovie,getMovieByName,deleteMovie}=require('../Controllers/movieController')

describe('addMovie',()=>{
    let req,res;
    beforeEach(()=>{
        req={
            body:{movieName:'Devara',theatreName:'PVR',totalTickets:100,availableTickets:100}
        };
        res={
            status:sinon.stub().returnsThis(),
            send:sinon.stub()
        };
        sinon.stub(Movie,'create');
    });
    afterEach(()=>{
        sinon.restore();
    });

    it('should add a movie successfully',async()=>{
        const fakeMovie={id:1,...req.body};
        Movie.create.resolves(fakeMovie);
        await addMovie(req,res);
        expect(Movie.create.calledOnceWith(req.body)).to.be.true;
        expect(res.status.calledOnceWith(201)).to.be.true;
        expect(res.send.calledOnceWith({message:"movie added successfully",payload:fakeMovie})).to.be.true;
    })
})


describe('getMovieByName', function () {
    let req,res;
    beforeEach(()=>{
        req={params:{moviename:'Devara'}}
        res={status:sinon.stub().returnsThis(),
        send:sinon.stub()}
        sinon.stub(Movie,'find')      
    });
    afterEach(()=>{
        sinon.restore();
    });
    it('should search for movies by name', async function () {
        let movie={movieName:"Devara",theatreName:"PVR",totalTickets:100,availableTickets:100}
        Movie.find.resolves(movie);
        await getMovieByName(req,res);
        expect(Movie.find.calledOnceWith({movieName:sinon.match.instanceOf(RegExp)})).to.be.true;
        expect(res.status.calledOnceWith(200)).to.be.true;
        expect(res.send.calledOnceWith({message:"All Movies",payload:movie})).to.be.true;
    });

    it('should return 404 if movie not found', async function () {
        Movie.find.resolves([]);
        await getMovieByName(req,res);
        expect(Movie.find.calledOnceWith({movieName:sinon.match.instanceOf(RegExp)})).to.be.true;
        expect(res.status.calledOnceWith(404)).to.be.true;
        expect(res.send.calledOnceWith({message:"Movie not found"})).to.be.true;
    });
});


describe('deleteMovie',()=>{
    let req,res;
    beforeEach(()=>{
        req={params:{id:'1',moviename:'Devara'}}
        res={status:sinon.stub().returnsThis(),
        send:sinon.stub()}
        sinon.stub(Movie,'findOneAndDelete')      
    });
    afterEach(()=>{
        sinon.restore();
    });
    xit('should delete a movie successfully',async()=>{
        const fakeMovie={id:'1',movieName:'Devara',theatreName:'PVR'};
        Movie.findOneAndDelete.resolves(fakeMovie);
        await deleteMovie(req,res);
        expect(Movie.findOneAndDelete.calledOnceWith({id:req.params.id,movieName:req.params.moviename})).to.be.true;
       console.log()
        expect(res.status.calledOnceWith(200)).to.be.true;
        expect(res.send.calledOnceWith({message:"Movie deleted successfully",payload:fakeMovie})).to.be.true;
    })
})
