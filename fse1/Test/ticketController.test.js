const chai=require('chai');
const expect=chai.expect;
const sinon=require('sinon');
const Ticket=require('../Models/Ticket')
const Movie=require('../Models/Movie')
const {bookTicket}=require('../Controllers/ticketControllers')


describe('bookTicket Controller',()=>{
    let req,res;
    beforeEach(()=>{
        req={
            params:{movieName:'Devara'},
            body:{theatreName:'PVR',numOfTickets:2,seatNumber:'A12'}
        };
        res={
            status:sinon.stub().returnsThis(),
            send:sinon.stub(),
        };
        sinon.stub(Movie,'findOne');
        sinon.stub(Ticket,'create');
        sinon.stub(Movie.prototype,'save')
    });
    afterEach(()=>{
        sinon.restore();
    });

    it('should return 404 if the movie is not found',async()=>{
        Movie.findOne.resolves(null);
        req={
            params:{movieName:'RRR'},
            body:{theatreName:'Inox'}
        }
        await bookTicket(req,res);
       
        expect(Movie.findOne.calledOnceWith({movieName:'RajaRani',theatreName:'Inox'})).to.be.false;
       expect(res.status.calledOnceWith(404)).to.be.true;
        expect(res.send.calledOnceWith({message:"Movie not found"})).to.be.true;
    })

    it('should return 404 if there are not enough tickets available',async()=>{
        const movie={movieName:'Devara',theatreName:'PVR',availableTickets:1};
        Movie.findOne.resolves(movie);
        await bookTicket(req,res);
        
        expect(res.status.calledOnceWith(400)).to.be.true;
       
        expect(res.send.calledOnceWith({message:"Not enough tickets available"})).to.be.true;
    })

    it('should book tickets successfully',async()=>{
        const movie={movieName:'Devara',theatreName:'PVR',totalTickets:10,save:sinon.stub()}
        const ticket={movieName:'Devara',theatreName:'PVR',numofTickets:2,seatNumber:'A12'};
        Movie.findOne.resolves(movie);
        Ticket.create.resolves(ticket)
        await bookTicket(req,res);
        expect(Ticket.create.calledOnceWith({movieName:'Devara',theatreName:'PVR',numOfTickets:2,seatNumber:'A12'})).to.be.false

        
        expect(res.send.calledOnceWith({message:"Tickets booked successfully",payload:ticket})).to.be.true;
    })
})