
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Events = () => {
    const handleNext = () => {
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').appendChild(items[0]);
      };
    
      const handlePrev = () => {
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').prepend(items[items.length - 1]); 
      };
    
      return (
        <div className='container my-12 '>
            <div className="containerslide lg:h-[80vh] h-[50vh] ">
          <div className="slide ">
           
            <div className="item absolute shadow-xl shadow-base-300 " style={{backgroundImage: "url(previous.jpg)"}}>
              <div className="content lg:max-w-lg max-w-[45%] left-1 lg:z-0  rounded-lg  lg:left-5 glassbg p-4">
                <div className="name text-lg lg:text-3xl text-red-500 font-meri">Previous Events</div>
                <div className="des font-serif"> <span className='text-xl font-black text-primary'>"A Glimpse Into the Past!"</span> <br />
                Relive the moments, memories, and milestones of our successful past events.</div>
                <Link to={'/events'}><button className='btn btn-primary'>See More</button></Link>
              </div>
            </div>
            
            <div className="item absolute shadow-xl shadow-base-300 " style={{backgroundImage: "url(/ongoing.jpg)"}}>
              <div className="content lg:max-w-lg max-w-[45%] left-1 lg:z-0  rounded-lg  lg:left-5 glassbg p-4">
                <div className="name text-lg lg:text-3xl text-yellow-500 font-meri">Ongoging Events</div>
                <div className="des font-serif"> <span className='text-xl font-black text-primary'>"Gear Up for Excitement!"</span> <br />
                Our event is live! Join the action, connect with peers, and make the most of the moment.</div>
                <Link to={'/events'}><button className='btn btn-primary'>See More</button></Link>
              </div>
            </div>
            <div className="item absolute shadow-xl shadow-base-300" style={{backgroundImage: "url(icpc.jpg)"}}>
              <div className="content lg:max-w-lg max-w-[45%] left-1 lg:z-0  rounded-lg  lg:left-5 glassbg p-4">
                <div className="name text-lg lg:text-3xl font-meri text-green-500">Upcoming Events</div>
                <div className="des font-serif "> <span className='text-xl font-black text-primary'>"Gear Up for Excitement!"</span> <br />
                Stay ahead of the game with our upcoming events. Don’t miss the chance to learn, connect, and grow.</div>
                <Link to={'/events'}><button className='btn btn-primary'>See More</button></Link>
              </div>
            </div>
           
          </div>
          <div className="buttonslide text-4xl w-fit p-2 glassbg text-violet-300">
            <button className="prev btn-outline border-2 border-white shadow-2xl shadow-white btn-white" onClick={handlePrev}><BiSkipPrevious></BiSkipPrevious></button>
            <button className="next btn-outline border-2 border-white shadow-2xl shadow-white btn-white" onClick={handleNext}><BiSkipNext className=''></BiSkipNext></button>
          </div>
          
        </div>
        </div>
      );
};


export default Events;