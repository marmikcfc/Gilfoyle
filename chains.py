"""Create a conversation chain for interview."""
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.callbacks.tracers import LangChainTracer
from langchain.chains import ConversationChain
from langchain.chains.llm import LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
from interview_sections import InterviewSections 

def get_chain(interview_section, stream_handler, prompt, tracing: bool = False) -> ConversationChain:
    """Create a converstion introduction chain for question/answering."""
    manager = AsyncCallbackManager([])
    #question_manager = AsyncCallbackManager([question_handler])
    stream_manager = AsyncCallbackManager([stream_handler])
    if tracing:
        tracer = LangChainTracer()
        tracer.load_default_session()
        manager.add_handler(tracer)
        question_manager.add_handler(tracer)
        stream_manager.add_handler(tracer)

    streaming_llm = OpenAI(
        streaming=True,
        callback_manager=stream_manager,
        verbose=True,
        temperature=0,
    )

    print("creating chain")

    if interview_section == InterviewSections.CODING_INTERVIEW_INTRO:
        conversation_chain = ConversationChain(
            prompt = prompt,
            llm=streaming_llm, 
            verbose=True, 
            memory=ConversationBufferMemory()
        )
    else:
        return None

    return conversation_chain